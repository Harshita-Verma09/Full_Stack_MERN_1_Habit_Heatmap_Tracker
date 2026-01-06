
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import habitRoutes from "./routes/habitRoutes.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// MOUNT ROUTER
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 2000;

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("DB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log(err));
