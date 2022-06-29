import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from "socket.io";
// mongo connection
import "./config/mongo.js";
// socket configuration
// import WebSockets from "./utils/WebSockets.js";
// routes
import routes from './routes/index.js';
// middlewares
import { decode } from "./middlewares/jwt.js";

const app =  express();

const port =  process.env.PORT || 3000;
app.set("port", port);
app.use(cors());
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
global.io = new Server(server, {
	cors : { 
		origin: "*"
	}
});
global.io.on('connection', (socket) => {
	let users = [];
	socket.on('disconnect', () => {
		users = users.filter((user) => user.socketId !== socket.id);
	});
	socket.on('identity', (userId) => {
		users.push({socketId: socket.id, userId:userId});
	});
	socket.on("subscribe", (room, otherUserId = "") => {
		subscribeOtherUser(room, otherUserId);
		socket.join(room);
	});
	socket.on("unsubscribe", (room) => {
		socket.leave(room);
	});
	function subscribeOtherUser(room, otherUserId) {
		const userSockets = users.filter(
		  (user) => user.userId === otherUserId
		);
		userSockets.map((userInfo) => {
		  const socketConn = global.io.sockets.connected(userInfo.socketId);
		  if (socketConn) {
			socketConn.join(room);
		  }
		});
	};
});
server.on("listening", () => {
	console.log(`Listening on port:: http://localhost:${port}/`)
});

