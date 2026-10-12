
import http from 'http';
import { createapp } from './app.js';
import mongoose from 'mongoose';
import { env } from './lib/config/env.js';
import { logger } from './pkg/logger/logger.js';
import { connectDB } from './lib/db/mongoose.js';

const app = createapp()
connectDB()
const server = http.createServer(app);
server.listen(env.port,()=>{
    logger.info(`Server is Running on ${env.port} ...`);
});

function shutdown(){
    server.close(
        async ()=>{
           try {
             await mongoose.disconnect();
            
           } catch {}
           process.exit(0)
        });
    setTimeout(()=> process.exit(1),10000).unref();
}
process.on('SIGINT',shutdown);
process.on('SIGTREM',shutdown)

