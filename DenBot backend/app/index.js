require("dotenv").config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { SessionController, AdminController, UserController, AuthController, UnAuthorizedSessionController, PaymentController }  from './controllers';
import { authenticateToken } from './utils/auth';

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_DB_URL);

app.use('/api', express.static('www'));

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ extended: true , limit:'100mb'}));
app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.get('/api/', (req, res)=>{
	res.status(200);
    console.log(req, res);
	res.send("Welcome to root URL of Server");
});

app.use('/api/auth', AuthController);
app.use('/api/admin', AdminController);
app.use('/api/user', UserController);
app.use('/api/payment', PaymentController);
app.use('/api/session', authenticateToken, SessionController);
app.use('/api/noSession', UnAuthorizedSessionController);

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
