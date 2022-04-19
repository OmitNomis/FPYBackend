const router = require("express").Router();
const { getChat } = require("./chat.controller");
router.get("/get/:senderID/:receiverID", getChat);
module.exports = router;
