import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

//routes imports

import connectDB from "./config/db.js";

// dot env config 

dotenv.config();

//database connection 
connectDB();

//rest objet 
const app = express();

//middlewares 

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//route
import testRoutes  from './routes/testRoutes.js';
import userRoutes    from './routes/userRoutes.js';

app.use('/api/v1/', testRoutes);
app.use('/api/v1/user', userRoutes);

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