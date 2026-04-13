import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import reservationRoutes from './routes/reservations.js';
import menuRoutes from './routes/menus.js';
import galleryRoutes from './routes/gallery.js';
import settingsRoutes from './routes/settings.js';
import { authMiddleware } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);

// Protected routes (Admin)
app.use('/api/admin', authMiddleware);
app.use('/api/admin/reservations', reservationRoutes);
app.use('/api/admin/menus', menuRoutes);
app.use('/api/admin/gallery', galleryRoutes);
app.use('/api/admin/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: "L'Imperial API 服务器运行中" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || '服务器内部错误',
  });
});

// Serve React frontend (client)
const clientDistPath = path.join(__dirname, '../../client/dist/client');
app.use(express.static(clientDistPath));

// SPA fallback - all routes go to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🍽️  L'Imperial 服务器已启动: http://localhost:${PORT}`);
});
