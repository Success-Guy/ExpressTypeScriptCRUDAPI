import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();
app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app)
server.listen(8080, () => console.log("Server running on http://localhost:8080"))

const MONGO_URL = "" //enter your mongodb connection string

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use(function(req, res, next) {  
     res.header('Access-Control-Allow-Origin', req.headers.origin);
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});  
app.use('/', router());
