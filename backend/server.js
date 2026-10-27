// backend/server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { startMapsScraping } from './scraper.js';

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
  // A failed run (e.g. browser launch error) must not take the whole server down
  startMapsScraping(keyword, location, io).catch((err) => {
    console.error('[Scraper] Run failed:', err.message);
    io.emit('scraping-finished');
  });

  // Instantly return execution acknowledgment back to client
  res.status(200).json({ status: "Scraping started background process." });
});

io.on('connection', (socket) => {
  console.log(`Client streaming channel synchronized: ${socket.id}`);
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));