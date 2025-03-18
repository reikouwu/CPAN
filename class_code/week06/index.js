import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import book_router from './routers/book_router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
   app.listen(PORT, () => {
         console.log(`http://localhost:${PORT}`);
   })
})

app.use(cors("/book", book_router));
