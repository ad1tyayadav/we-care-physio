import React, { useState, useEffect, useRef } from 'react';
import StatCard from './components/StatCard';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- TYPE DEFINITIONS ---
interface IStats {
  totalActive: number;
  totalToday: number;
  pagesVisited: Record<string, number>;
}

interface IEvent {
  type: 'pageview' | 'click' | 'session_end';
  page: string;
  sessionId: string;
  timestamp: string;
  country: string;
}

interface ISessionData {
  sessionId: string;
  currentPage: string;
  journey: string[];
  duration: number;
}

// --- COMPONENT ---
const WS_URL = 'ws://localhost:4000';
const MAX_CHART_POINTS = 12; // 12 points * 10s = 2 minutes

const App: React.FC = () => {
  // State management with TypeScript types
  const [connectionStatus, setConnectionStatus] = useState<string>('Connecting...');
  const [stats, setStats] = useState<IStats>({ totalActive: 0, totalToday: 0, pagesVisited: {} });
  const [sessions, setSessions] = useState<Record<string, ISessionData>>({});
  const [feed, setFeed] = useState<IEvent[]>([]);
  const [connectedDashboards, setConnectedDashboards] = useState<number>(0);
  
  const [chartData, setChartData] = useState<any>({
    labels: Array(MAX_CHART_POINTS).fill(new Date().toLocaleTimeString()),
    datasets: [],
  });
  const visitorsPerInterval = useRef<number[]>(Array(MAX_CHART_POINTS).fill(0));
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
if (socket.current) return;

    const connect = () => {
      socket.current = new WebSocket(WS_URL);
      socket.current.onopen = () => setConnectionStatus('Connected');
      socket.current.onclose = () => {
        setConnectionStatus('Reconnecting...');
        setTimeout(connect, 3000);
      };
      socket.current.onerror = () => {
        setConnectionStatus('Error');
        socket.current?.close();
      };
      socket.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        handleMessage(msg);
      };
    };
    
    connect();

    const chartInterval = setInterval(() => {
        visitorsPerInterval.current.shift();
        visitorsPerInterval.current.push(0);
        setChartData((prevData: any) => {
            const newLabels = [...prevData.labels];
            newLabels.shift();
            newLabels.push(new Date().toLocaleTimeString());
            return { ...prevData, labels: newLabels, datasets: [{ ...prevData.datasets[0], data: [...visitorsPerInterval.current] }] };
        });
    }, 10000);

    return () => {
      clearInterval(chartInterval);
      if (socket.current) socket.current.close();
    };
  }, []);

  const handleMessage = (msg: any) => {
    switch (msg.type) {
      case 'user_connected':
      case 'user_disconnected':
        setConnectedDashboards(msg.data.totalDashboards);
        break;
      case 'visitor_update':
        setStats(msg.data.stats);
        setFeed(prevFeed => [msg.data.event, ...prevFeed].slice(0, 50));
        if (msg.data.event.type === 'pageview') {
            visitorsPerInterval.current[visitorsPerInterval.current.length - 1]++;
        }
        break;
      case 'session_activity':
        setSessions(prevSessions => ({ ...prevSessions, [msg.data.sessionId]: msg.data }));
        break;
      default:
        break;
    }
  };

  const getMostVisitedPage = (): string => {
    const pages = Object.entries(stats.pagesVisited);
    if (pages.length === 0) return '-';
    return pages.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  };

  const chartOptions = {
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#9ca3af' }, grid: { color: '#374151' } }, x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } } },
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
  };

  useEffect(() => {
    setChartData({
      labels: Array(MAX_CHART_POINTS).fill(null).map((_, i) => new Date(Date.now() - (MAX_CHART_POINTS - 1 - i) * 10000).toLocaleTimeString()),
      datasets: [{
        label: 'New Visitors',
        data: visitorsPerInterval.current,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
        fill: true,
      }],
    });
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Visitor Analytics Dashboard</h1>
        <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800">
          <div className={`h-2.5 w-2.5 rounded-full ${connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="font-medium text-gray-300">{connectionStatus}</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard label="Active Visitors" value={stats.totalActive} />
        <StatCard label="Total Events Today" value={stats.totalToday} />
        <StatCard label="Dashboards Connected" value={connectedDashboards} />
        <StatCard label="Most Visited Page" value={getMostVisitedPage()} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Feed */}
        <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Live Visitor Feed</h2>
          <div className="space-y-4 h-96 overflow-y-auto">
            {feed.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">Waiting for visitor events...</p>
            ) : (
              feed.map((event, index) => (
                <div key={`${event.sessionId}-${index}`} className="border-l-4 border-gray-600 pl-3 hover:bg-gray-700 py-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-400">{event.type}</span>
                    <span className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    User <span className="font-semibold text-yellow-400">{event.sessionId}</span> viewed <span className="font-semibold text-green-400">{event.page}</span> from {event.country}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Sessions & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Active Sessions</h2>
            <div className="space-y-3 h-60 overflow-y-auto">
              {Object.keys(sessions).length === 0 ? (
                 <p className="text-gray-500 text-center mt-4">No active sessions.</p>
              ) : (
                Object.values(sessions).map(session => (
                  <div key={session.sessionId} className="flex justify-between items-center p-2 rounded hover:bg-gray-700 cursor-pointer" title={`Click to see journey for ${session.sessionId}`} onClick={() => alert(`Journey for ${session.sessionId}:\n${session.journey.join(' -> ')}`)}>
                    <div>
                      <div className="font-bold text-gray-200">Session: {session.sessionId}</div>
                      <div className="text-sm text-gray-400">On page: <span className="text-green-400 font-medium">{session.currentPage}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg text-blue-400">{Math.round(session.duration)}s</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Visitors (Last 2 Minutes)</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;