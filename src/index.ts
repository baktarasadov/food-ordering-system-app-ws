import express from 'express';
require('dotenv').config();
import { sequelize } from './config/dbConnect';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';
const bodyParser = require("body-parser");

const app = express();
const cors = require('cors');

const port: string | undefined = process.env.APP_PORT;
const base: string = "/api"

app.use(cors());
app.use(express.json());

app.use(base, authRouter);
app.use(base, userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

sequelize
    .sync()
    .then(() => {
        console.log('PostgreSQL database connected');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
    });