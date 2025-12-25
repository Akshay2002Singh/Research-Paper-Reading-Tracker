import express from 'express';
import cors from 'cors';
import papersRouter from './routes/papers.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/papers', papersRouter);

export default app;
