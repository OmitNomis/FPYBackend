const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  addPost,
  deletePost,
  soldPost,
  getPostById,
  getPosts,
  getSoldPosts,
  bookmarkPost,
  getBookmarks,
  deleteBookmark,
  getGenres,
  getPostGenre,
  getPostsByUser,
  editPost,
} = require("./books.controller");
router.post("/add", checkToken, addPost);
router.post("/deletePost", checkToken, deletePost);
router.post("/sold", checkToken, soldPost);
router.post("/bookmarkPost", checkToken, bookmarkPost);
router.post("/deleteBookmark", checkToken, deleteBookmark);
router.post("/editPost", checkToken, editPost);
router.get("/getBookmarks/:id", checkToken, getBookmarks);
router.get("/getPostById/:id", checkToken, getPostById);
router.get("/getSoldPosts/:id", checkToken, getSoldPosts);
router.get("/getPostGenre/:id", checkToken, getPostGenre);
router.get("/getPosts", checkToken, getPosts);
router.get("/getPostsByUser/:id", checkToken, getPostsByUser);
router.get("/getGenres", getGenres);
module.exports = router;
