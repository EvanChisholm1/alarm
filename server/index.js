const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors("*"));

let isAlarmRunning = false;
let isPaused = false;
let hasBeenPaused = false;

cron.schedule("0 7 * * *", () => {
  console.log("starting alarm");
  isAlarmRunning = true;
  hasBeenPaused = false;
  io.emit("alarmState", isAlarmRunning);
});

app.get("/", (req, res) => {
  console.log(isAlarmRunning);
  res.send({ isAlarmRunning });
});

app.post("/", (req, res) => {
  console.log(req.body);
  isAlarmRunning = req.body.newState;
  console.log(isAlarmRunning);
  hasBeenPaused = false;
  io.emit("alarmState", isAlarmRunning);
  res.send({ isAlarmRunning });
});

io.on("connection", socket => {
  console.log("new connection");
  socket.emit("alarmState", isAlarmRunning);

  socket.on("stop", () => {
    console.log("stopping alarm");
    isAlarmRunning = false;
    isPaused = false;
    io.emit("alarmState", isAlarmRunning);
    io.emit("isPaused", false);
  });

  socket.on("pause", () => {
    console.log("pausing alarm");
    if (!isAlarmRunning || hasBeenPaused) return;

    isAlarmRunning = false;
    isPaused = true;
    hasBeenPaused = true;

    io.emit("alarmState", isAlarmRunning);
    io.emit("isPaused", true);

    setTimeout(() => {
      if (!isPaused) return;
      isAlarmRunning = true;
      isPaused = false;
      io.emit("alarmState", isAlarmRunning);
      io.emit("isPaused", isPaused);
    }, 60000);
  });
});

const start = () => {
  server.listen(3000, process.env.HOSTNAME, () => console.log("running app"));
  console.log(process.env.HOSTNAME);
  // server.listen(3000, "localhost", () => console.log("running app"));
};

start();
