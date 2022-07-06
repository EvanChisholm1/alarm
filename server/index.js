const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors("*"));

let isAlarmRunning = true;

app.get("/", async (req, res) => {
  console.log(isAlarmRunning);
  res.send({ isAlarmRunning });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  isAlarmRunning = req.body.newState;
  io.emit("alarmState", isAlarmRunning);
  res.send({ isAlarmRunning });
});

io.on("connection", socket => {
  console.log("new connection");
  socket.on("message", message => {
    socket.emit("server message", `server: ${message}`);
    console.log(message);
  });

  socket.on("stop", () => {
    console.log("stopping alarm");
    isAlarmRunning = false;
    io.emit("alarmState", isAlarmRunning);
  });
});

const start = () => {
  server.listen(3000, () => console.log("running app"));
};

start();
