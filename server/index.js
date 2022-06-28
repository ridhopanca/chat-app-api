import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from "socket.io";
// mongo connection
import "./config/mongo.js";
// socket configuration
import WebSockets from "./utils/WebSockets.js";
// routes
import routes from './routes/index.js';
// middlewares
import { decode } from "./middlewares/jwt.js";

const app =  express();

const port =  process.env.PORT || 3000;
app.set("port", port);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.get('/', (req, res) => {
        res.send('Welcome to API chat application');
});

app.use('*', (req, res) => {
	return res.status(404).json({
		success: false,
		message: "API endpoint doesn't exist"
	});
});
// Create HTTP server
const server = http.createServer(app);
server.listen(port);
// Create socket connection
global.io = new Server(server);
global.io.on('connection',WebSockets.connection);
server.on("listening", () => {
	console.log(`Listening on port:: http://localhost:${port}/`)
});

