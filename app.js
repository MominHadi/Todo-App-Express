import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db/connectDB.js";
import apiRoutes from "./routes/index.js";
let app = express();
let PORT = process.env.port || 5000;
connectDB();

app.use(express.json());

app.use("/api", apiRoutes);

//Global Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        success: false,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`App listening to Port ${PORT}`);
});