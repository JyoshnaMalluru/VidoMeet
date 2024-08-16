import express, { urlencoded } from "express";
import {createServer} from "node:http";
import{Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port",(process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb",extended:true}))
app.use("/api/v1/users",userRoutes);
app.get("/home",(req,res) => {
    return res.json({"hello":"World"})
});
const start = async () => {
app.set("mongo_user")
    const connectionDB = await mongoose.connect("mongodb+srv://jyoshna1595:bir7kM3uKwhICm44@cluster0.jmmh2.mongodb.net/")
    console.log(`MONGO CONNECTED TO DB HOST: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("listening to port 8000")
    })
}
start();