const { response } = require("express");
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
} = require("./books.service");

module.exports = {
  addPost: (req, res) => {
    const body = req.body;
    addPost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deletePost: (req, res) => {
    const body = req.body;
    deletePost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deleteBookmark: (req, res) => {
    const body = req.body;
    deleteBookmark(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  soldPost: (req, res) => {
    const body = req.body;
    soldPost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error Occured, Please Try Again",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  editPost: (req, res) => {
    const body = req.body;
    editPost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error Occured, Please Try Again",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getPostById: (req, res) => {
    const id = req.params.id;
    getPostById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getPostsByUser: (req, res) => {
    const id = req.params.id;
    getPostsByUser(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No Posts Yet",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getPostGenre: (req, res) => {
    const id = req.params.id;
    getPostGenre(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Error Loading Post Genre",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getSoldPosts: (req, res) => {
    const id = req.params.id;
    getSoldPosts(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length == 0) {
        return res.json({
          success: 0,
          message: "No books sold yet",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getPosts: (req, res) => {
    getPosts((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getGenres: (req, res) => {
    getGenres((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  bookmarkPost: (req, res) => {
    const body = req.body;
    bookmarkPost(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getBookmarks: (req, res) => {
    const id = req.params.id;
    getBookmarks(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length == 0) {
        return res.json({
          success: 0,
          message: "No bookmarks yet",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
