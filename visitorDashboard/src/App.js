"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const StatCard_1 = __importDefault(require("./components/StatCard"));
const react_chartjs_2_1 = require("react-chartjs-2");
const chart_js_1 = require("chart.js");
// Register Chart.js components
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend, chart_js_1.Filler);
// --- COMPONENT ---
const WS_URL = 'ws://localhost:4000';
const MAX_CHART_POINTS = 12; // 12 points * 10s = 2 minutes
const App = () => {
    // State management with TypeScript types
    const [connectionStatus, setConnectionStatus] = (0, react_1.useState)('Connecting...');
    const [stats, setStats] = (0, react_1.useState)({ totalActive: 0, totalToday: 0, pagesVisited: {} });
    const [sessions, setSessions] = (0, react_1.useState)({});
    const [feed, setFeed] = (0, react_1.useState)([]);
    const [connectedDashboards, setConnectedDashboards] = (0, react_1.useState)(0);
    const [chartData, setChartData] = (0, react_1.useState)({
        labels: Array(MAX_CHART_POINTS).fill(new Date().toLocaleTimeString()),
        datasets: [],
    });
    const visitorsPerInterval = (0, react_1.useRef)(Array(MAX_CHART_POINTS).fill(0));
    const socket = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const connect = () => {
            socket.current = new WebSocket(WS_URL);
            socket.current.onopen = () => setConnectionStatus('Connected');
            socket.current.onclose = () => {
                setConnectionStatus('Reconnecting...');
                setTimeout(connect, 3000);
            };
            socket.current.onerror = () => {
                var _a;
                setConnectionStatus('Error');
                (_a = socket.current) === null || _a === void 0 ? void 0 : _a.close();
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
            setChartData((prevData) => {
                const newLabels = [...prevData.labels];
                newLabels.shift();
                newLabels.push(new Date().toLocaleTimeString());
                return Object.assign(Object.assign({}, prevData), { labels: newLabels, datasets: [Object.assign(Object.assign({}, prevData.datasets[0]), { data: [...visitorsPerInterval.current] })] });
            });
        }, 10000);
        return () => {
            clearInterval(chartInterval);
            if (socket.current)
                socket.current.close();
        };
    }, []);
    const handleMessage = (msg) => {
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
                setSessions(prevSessions => (Object.assign(Object.assign({}, prevSessions), { [msg.data.sessionId]: msg.data })));
                break;
            default:
                break;
        }
    };
    const getMostVisitedPage = () => {
        const pages = Object.entries(stats.pagesVisited);
        if (pages.length === 0)
            return '-';
        return pages.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    };
    const chartOptions = {
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#9ca3af' }, grid: { color: '#374151' } }, x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } } },
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
    };
    (0, react_1.useEffect)(() => {
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
    return (<div className="p-4 md:p-8 max-w-7xl mx-auto">
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
        <StatCard_1.default label="Active Visitors" value={stats.totalActive}/>
        <StatCard_1.default label="Total Events Today" value={stats.totalToday}/>
        <StatCard_1.default label="Dashboards Connected" value={connectedDashboards}/>
        <StatCard_1.default label="Most Visited Page" value={getMostVisitedPage()}/>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Feed */}
        <div className="lg:col-span-1 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Live Visitor Feed</h2>
          <div className="space-y-4 h-96 overflow-y-auto">
            {feed.length === 0 ? (<p className="text-gray-500 text-center mt-4">Waiting for visitor events...</p>) : (feed.map((event, index) => (<div key={`${event.sessionId}-${index}`} className="border-l-4 border-gray-600 pl-3 hover:bg-gray-700 py-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-400">{event.type}</span>
                    <span className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    User <span className="font-semibold text-yellow-400">{event.sessionId}</span> viewed <span className="font-semibold text-green-400">{event.page}</span> from {event.country}
                  </p>
                </div>)))}
          </div>
        </div>

        {/* Sessions & Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Active Sessions</h2>
            <div className="space-y-3 h-60 overflow-y-auto">
              {Object.keys(sessions).length === 0 ? (<p className="text-gray-500 text-center mt-4">No active sessions.</p>) : (Object.values(sessions).map(session => (<div key={session.sessionId} className="flex justify-between items-center p-2 rounded hover:bg-gray-700 cursor-pointer" title={`Click to see journey for ${session.sessionId}`} onClick={() => alert(`Journey for ${session.sessionId}:\n${session.journey.join(' -> ')}`)}>
                    <div>
                      <div className="font-bold text-gray-200">Session: {session.sessionId}</div>
                      <div className="text-sm text-gray-400">On page: <span className="text-green-400 font-medium">{session.currentPage}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg text-blue-400">{Math.round(session.duration)}s</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>)))}
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Visitors (Last 2 Minutes)</h2>
            <react_chartjs_2_1.Line data={chartData} options={chartOptions}/>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = App;
