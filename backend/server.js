import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import fileUpload from 'express-fileupload';

//ROUTE 
import FileRoutes from './routes/FileRoutes.js';


const app = express();

dotenv.config();

//Connect to DB
connectDB();

app.use(express.static('uploads'));
app.use(fileUpload());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "File Sharing Api Using Node js" });
})

// ROUTING
app.use("/api", FileRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on ${PORT} PORT`));