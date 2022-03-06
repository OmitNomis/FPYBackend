const router = require("express").Router();
const { register } = require("./register.controller");
router.post("/", register);
module.exports = router;
