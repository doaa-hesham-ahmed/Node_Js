import mongoose from 'mongoose';
import dns from 'node:dns';
import { env } from '../config/env.js';
dns.setServers(['8.8.8.8', '8.8.4.4']);

export const connectDB = async () => {
    await mongoose.connect(env.db.url);
    console.log('MongoDB connected successfully');
};

