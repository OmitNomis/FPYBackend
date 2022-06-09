require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const nodemailer = require("nodemailer");

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

const transporter = nodemailer.createTransport({
  service: "hotmail",

  auth: {
    user: "pickabooknp@outlook.com",
    pass: "PasswordForProject",
  },
});

app.post("/api/feedback", (req, res) => {
  const body = req.body;

  var feedback = {
    from: "pickabooknp@outlook.com",
    to: "pickabooknp@outlook.com",
    subject: "Pick-A-Book Application Feedback",
    text:
      "Sent By: " +
      body.UserName +
      "\n By Email: " +
      body.UserEmail +
      "\nFeedback: " +
      body.Feedback,
  };

  transporter.sendMail(feedback, function (err, info) {
    if (err) {
      console.log(err);
      res.status(400).json({
        success: 0,
        message: "Feedback Failed",
      });
      return;
    }
    res.status(200).json({
      success: 1,
      data: info,
    });
    transporter.sendMail(reply, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
    });
  });

  var reply = {
    from: "pickabooknp@outlook.com",
    to: body.UserEmail,
    subject: "Thank you for the Feedback - Pick A Book",
    text:
      "Dear " +
      body.UserName +
      ", \n" +
      "Thank you for the feedback to our Application. We are determined to provide a good service to our customers. \n Regards, \n Pick A Book",
  };
});
