// index.ts
import express from 'express';
import { Server as HttpServer } from 'http';
import WebSocket, { Server as WsServer } from 'ws';

/* ---------- TYPE DEFINITIONS ---------- */
interface EventPayload {
  type: 'pageview' | 'click' | 'session_end';
  page: string;
  sessionId: string;
  timestamp: string;
  country: string;
  metadata?: Record<string, any>;
}

interface Session {
  journey: { page: string; timestamp: Date }[];
  startTime: Date;
  lastUpdate: Date;
  duration: number;
}

interface Stats {
  totalActive: number;
  totalToday: number;
  pagesVisited: Record<string, number>;
}

interface WebSocketMessage {
  type: string;
  data?: any;
  filter?: any;
  action?: string;
  details?: any;
}

/* ---------- IN-MEMORY STORES ---------- */
const events: EventPayload[] = [];
const sessions: Record<string, Session> = {};
const stats: Stats = {
  totalActive: 0,
  totalToday: 0,
  pagesVisited: {},
};

/* ---------- EXPRESS SETUP ---------- */
const app = express();
const PORT = 4000;
app.use(express.json());


app.use(express.static('public')); 

/* ---------- REST ENDPOINTS ---------- */
app.post('/api/events', (req, res) => {
  const ev: EventPayload = req.body;
  const { sessionId, page, timestamp, type, country } = ev;
  const ts = new Date(timestamp);

  events.push(ev);

  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      journey: [],
      startTime: ts,
      lastUpdate: ts,
      duration: 0,
    };
    stats.totalActive++;
  }

  const session = sessions[sessionId];

  if (type === 'pageview') {
    session.journey.push({ page, timestamp: ts });
    stats.pagesVisited[page] = (stats.pagesVisited[page] || 0) + 1;
  } else if (type === 'session_end') {
    stats.totalActive--;
  }

  session.lastUpdate = ts;
  session.duration = (ts.getTime() - session.startTime.getTime()) / 1000;
  stats.totalToday++;

  // Broadcast messages
  const visitorMsg = JSON.stringify({
    type: 'visitor_update',
    data: { event: ev, stats },
  });
  const sessionMsg = JSON.stringify({
    type: 'session_activity',
    data: {
      sessionId,
      currentPage: page,
      journey: session.journey.map((item) => item.page),
      duration: session.duration,
    },
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(visitorMsg);
      client.send(sessionMsg);
    }
  });

  res.sendStatus(200);
});

app.get('/api/analytics/summary', (_req, res) => res.json(stats));
app.get('/api/analytics/sessions', (_req, res) => res.json(sessions));

/* ---------- HTTP + WS SERVER ---------- */
const server: HttpServer = app.listen(PORT, () =>
  console.log(`API server listening on http://localhost:${PORT}`)
);

const wss = new WsServer({ server });
let dashboardCount = 0;

wss.on('connection', (ws: WebSocket) => {
  dashboardCount++;
  const connectMsg = JSON.stringify({
    type: 'user_connected',
    data: {
      totalDashboards: dashboardCount,
      connectedAt: new Date().toISOString(),
    },
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(connectMsg);
  });

  ws.on('message', (raw) => {
    let msg: WebSocketMessage;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    switch (msg.type) {
      case 'request_detailed_stats': {
        const { filter } = msg;
        const filtered = events.filter((ev) => {
          return (!filter.country || ev.country === filter.country) &&
            (!filter.page || ev.page === filter.page);
        });

        const detailed = {
          total: filtered.length,
          byPage: filtered.reduce<Record<string, number>>((acc, ev) => {
            acc[ev.page] = (acc[ev.page] || 0) + 1;
            return acc;
          }, {}),
          byCountry: filtered.reduce<Record<string, number>>((acc, ev) => {
            acc[ev.country] = (acc[ev.country] || 0) + 1;
            return acc;
          }, {}),
        };
        ws.send(JSON.stringify({ type: 'detailed_stats', data: detailed }));
        break;
      }
      case 'track_dashboard_action':
        console.log('Dashboard action:', msg.action, msg.details);
        break;
      default:
      // ignore
    }
  });

  ws.on('close', () => {
    dashboardCount--;
    const discMsg = JSON.stringify({
      type: 'user_disconnected',
      data: { totalDashboards: dashboardCount },
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(discMsg);
    });
  });
});

/* ---------- GRACEFUL SHUTDOWN ---------- */
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  wss.close();
  server.close();
  process.exit();
});