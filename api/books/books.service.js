const pool = require("../../config/database");

module.exports = {
  addPost: (data, callBack) => {
    pool.query(
      `insert into item(postId, title, author, price, priceType, delivery, bookCondition, location, trade, tradeWith, image, userId, postDate, sold) 
      values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.PostId,
        data.Title,
        data.Author,
        data.Price,
        data.PriceType,
        data.Delivery,
        data.BookCondition,
        data.Location,
        data.Trade,
        data.TradeWith,
        data.Image,
        data.UserId,
        data.PostDate,
        data.Sold,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
    data.GenreId.map((genre) => {
      let postId = data.PostId;
      pool.query(
        `insert into itemgenre (genreID, postID) values (?,?)`,
        [genre, postId],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
        }
      );
    });
  },
  bookmarkPost: (data, callBack) => {
    pool.query(
      `insert into bookmark (userID, postID) values (?,?)`,
      [data.UserId, data.PostId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deletePost: (data, callBack) => {
    pool.query(
      `delete from itemgenre where postID = ?`,
      [data.PostId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
    setTimeout(() => {
      pool.query(
        `delete from item where postID = ?`,
        [data.PostId],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        },
        1000
      );
    });
  },
  soldPost: (data, callBack) => {
    pool.query(
      `UPDATE item SET sold = '1' WHERE postID = ?`,
      [data.PostId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteBookmark: (data, callBack) => {
    pool.query(
      `delete from bookmark where postID = ? and userID = ?`,
      [data.PostId, data.UserId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSoldPosts: (userId, callBack) => {
    pool.query(
      `SELECT * from item where userID =? and sold ='1'`,
      [userId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getGenres: (callBack) => {
    pool.query(`SELECT * from genre`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getBookmarks: (userId, callBack) => {
    pool.query(
      `SELECT * from item where postID in (select postID from bookmark where userID = ?)`,
      // `select postID from bookmark where userID = ?`,
      [userId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPostById: (postId, callBack) => {
    pool.query(
      `select * from item where postID = ?`,
      [postId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getPostGenre: (postId, callBack) => {
    pool.query(
      `select genreId from item where postID = ?`,
      [postId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getPosts: (callBack) => {
    pool.query(`select * from item`, [], (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    });
  },
};
