import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to Mongo DB"))
  .catch((error) => {
    console.log(error);
    console.log("Bad Authentication");
  });

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("listening on port number 3000");
});


app.use('/api/auth', router);


app.use((error, request, response, next)=>{
  const statusCode = error.statusCode || 500;
const message = error.message || 'Internal Server Error';
return response.status(statusCode).json({
  success:false,
  statusCode,
  message
});
});