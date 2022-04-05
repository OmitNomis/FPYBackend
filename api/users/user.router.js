const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  changePassword,
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.post("/updateuser", checkToken, updateUsers);
router.post("/deleteuser", checkToken, deleteUser);
router.post("/changePassword", checkToken, changePassword);

module.exports = router;
