const router = require("express").Router();
const { getChat, getExistingChat } = require("./chat.controller");
router.get("/get/:senderID/:receiverID", getChat);
router.get("/existingChat/:id/", getExistingChat);
module.exports = router;
