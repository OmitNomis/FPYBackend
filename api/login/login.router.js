const router = require("express").Router();
const { login } = require("./login.controller");
router.post("/", login);
module.exports = router;
