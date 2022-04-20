require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const port = process.env.APP_PORT;

const userRouter = require("./api/users/user.router");
const loginRouter = require("./api/login/login.router");
const registerRouter = require("./api/register/register.router");
const bookRouter = require("./api/books/books.router");
const chatRouter = require("./api/chat/chat.router");

const multer = require("multer");
const pool = require("./config/database");
const res = require("express/lib/response");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("image"), (req, res) => {
  const img = req.file;
  if (!img) {
    res.status(400).json({ message: "Missing Image File" });
  } else {
    res.status(200).json({
      success: 1,
      data: req.file.path,
    });
  }
});

app.use(express.static("Uploads"));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/book", bookRouter);
app.use("/api/chat", chatRouter);

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    pool.query(
      `insert into chatmessages (senderID, receiverID, message, dateTime) values (?, ?, ?, ?)`,
      [msg.senderID, msg.receiverID, msg.message, msg.dateTime]
    );
  });
});
server.listen(port, () => {
  console.log("Server up and running :> on PORT :", port);
});
