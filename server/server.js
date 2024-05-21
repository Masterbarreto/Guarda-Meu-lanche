import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//routes imports

import connectDB from "./config/db.js";

// dot env config 

dotenv.config();

//database connection 
connectDB();

//cloudinary connection 
cloudinary.v2.config({
    cloud_name: "dbxtjyypl",
    api_key: "982238885987131",
    api_secret: "8rItakwpvCzKZGTCd6hv9BfbZno",
});

//rest objet 
const app = express();


//middlewares 

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//route
import testRoutes  from './routes/testRoutes.js';
import userRoutes    from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

app.use('/api/v1/', testRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

app.get('/',(req,res)=>{
    return res.status(200).send("<h1>welcome to node server</h1>")
});

//port

const PORT = process.env.PORT || 8080;


app.post("/", (req,res) => {
    res.send({status: "Started"});
});

//listen
app.listen(PORT,()=>{
    console.log(
        `Server Running On PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`
        .bgMagenta.white
    );
});