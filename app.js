require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const loginRouter = require("./api/login/login.router");
const registerRouter = require("./api/register/register.router");
const bookRouter = require("./api/books/books.router");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/book", bookRouter);

// app.get("/api", (req, res) => {
//   res.json({
//     success: 1,
//     message: "This is hehe",
//   });
// });

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running :> on PORT :", process.env.APP_PORT);
});
