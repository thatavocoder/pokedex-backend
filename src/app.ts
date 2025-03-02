import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import pokemonRoutes from './routes/pokemonRoutes';

config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';

  res.json({
    status: 'OK',
    timestamp: new Date(),
    database: {
      status: dbStatus,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    },
  });
});

app.use('/api/pokemon', pokemonRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
