import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//MONGODB CONNECTION
mongoose.connect(process.env.DATABASE_URL).then(() =>
    console.log('MongoDB conected ...')
).catch(err => 
    console.log(err)
);

app.get('/', (req, res) => { res.send('This is Express API') });
app.use(routes);

export default app;
