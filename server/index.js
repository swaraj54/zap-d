import express from 'express';
import router from './routes/index.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Dzap currency converter.")
})
app.use("/api/v1", router)

app.listen(8000, () => console.log("App is running on port 8000.🚀"))