/**
 * ScopeCrafter Main Server
 * Privacy-First Proposal & Scope Generator for Freelance Software Developers
 * Built with Open-Weight Gemma models, Backboard SDK, and Render Cloud.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import generateRoutes from './routes/generate.js';
import templateRoutes from './routes/templates.js';
import healthRoutes from './routes/health.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API routes
app.use('/api', generateRoutes);
app.use('/api', templateRoutes);
app.use('/api', healthRoutes);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`✨ ScopeCrafter Server Running`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`🧠 Model: google/gemma-4-26b-a4b-it:free (Open-Weight MoE)`);
  console.log(`⚡ Orchestration: Backboard SDK Engine`);
  console.log(`🔒 Privacy Shield: Active (Automatic NDA-Grade Redaction)`);
  console.log(`======================================================\n`);
});

export default app;
