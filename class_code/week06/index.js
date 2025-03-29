import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import book_router from './routers/book_router.js';
import user_router from './routers/user_router.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
   app.listen(PORT, () => {
         console.log(`http://localhost:${PORT}`);
   })
})

app.use(cors("/book", book_router));

app.use(cors("/user", user_router));