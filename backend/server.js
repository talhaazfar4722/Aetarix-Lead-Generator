// backend/server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { startMapsScraping } from './scraper.js';
import './db.js';
import { Lead } from './models/Lead.js';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:5173' }
});

app.post('/api/scrape', (req, res) => {
  const { keyword, country, city, specificArea } = req.body;
  
  if (!keyword || !country || !city) {
    return res.status(400).json({ error: "Missing required parameters: keyword, country, and city are required" });
  }

  // Combine location fields: if specificArea is provided, include it
  let location = `${city}, ${country}`;
  if (specificArea) {
    location = `${specificArea}, ${city}, ${country}`;
  }

  // Spin the long-running automation script inside the background asynchronously 
  startMapsScraping(keyword, location, io);

  // Instantly return execution acknowledgment back to client
  res.status(200).json({ status: "Scraping started background process." });
});

// Returns saved leads (most recent first). Optional `limit` query param.
app.get('/api/leads', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '100', 10), 1000);
    const leads = await Lead.find().sort({ createdAt: -1 }).limit(limit).lean();
    res.json(leads);
  } catch (err) {
    console.error('Error fetching leads:', err.message);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

io.on('connection', (socket) => {
  console.log(`Client streaming channel synchronized: ${socket.id}`);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(async () => {
    console.log('Server closed');
    process.exit(0);
  });
  
  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 30000);
});