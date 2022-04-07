const pool = require("../../config/database");

module.exports = {
  addPost: (data, callBack) => {
    pool.query(
      `insert into post(postID, title, author, price, priceType, delivery, bookCondition, location, trade, tradeWith, image, userId, postDate, sold) 
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
    setTimeout(function () {
      data.GenreId.map((genre) => {
        let postId = data.PostId;
        pool.query(
          `insert into postgenre (genreID, postID) values (?,?)`,
          [genre, postId],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
          }
        );
      });
    }, 500);
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
      `delete from postgenre where postID = ?`,
      [data.PostId],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
      }
    );
    setTimeout(() => {
      pool.query(
        `delete from post where postID = ?`,
        [data.PostId],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        },
        500
      );
    });
  },
  soldPost: (data, callBack) => {
    pool.query(
      `UPDATE post SET sold = '1' WHERE postID = ?`,
      [data.PostId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  editPost: (data, callBack) => {
    pool.query(
      `delete from postgenre where postID = ?`,
      [data.PostId],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
      }
    );
    setTimeout(function () {
      data.GenreId.map((genre) => {
        pool.query(
          `insert into postgenre (genreID, postID) values (?,?)`,
          [genre, data.PostId],
          (error, results, fields) => {
            if (error) {
              console.log(error);
            }
          }
        );
      });
    }, 500);
    pool.query(
      `UPDATE post SET title = ?, author = ?, price = ?, priceType = ?, delivery = ?, bookCondition = ?, location = ?, trade = ?, tradeWith = ?, image = ? WHERE postID = ?`,
      [
        data.Title,
        data.Autor,
        data.Price,
        data.PriceType,
        data.Delivery,
        data.BookCondition,
        data.Location,
        data.Trade,
        data.TradeWith,
        data.Image,
        data.PostId,
      ],
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
      `SELECT * from post where userID =? and sold ='1'`,
      [userId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
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
      `SELECT * from post where postID in (select postID from bookmark where userID = ?)`,
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
      `select * from post where postID = ?`,
      [postId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getPostsByUser: (userID, callBack) => {
    pool.query(
      `select * from post where userID = ?`,
      [userID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPostGenre: (postId, callBack) => {
    pool.query(
      `select genreID from postGenre where postID = ?`,
      [postId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPosts: (callBack) => {
    pool.query(
      `select * from post where sold = 0`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
