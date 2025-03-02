import app from './app';
import { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';

export default serverless(app);
