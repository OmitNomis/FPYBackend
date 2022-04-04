const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.post("/updateuser", checkToken, updateUsers);
router.post("/deleteuser", checkToken, deleteUser);

module.exports = router;
