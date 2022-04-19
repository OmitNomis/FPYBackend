const pool = require("../../config/database");

module.exports = {
  getChat: (req, res) => {
    const senderID = req.params.senderID;
    const receiverID = req.params.receiverID;
    pool.query(
      `select * from chatmessages where (senderID = ? and receiverID = ?) or (senderID = ? and receiverID = ?)`,
      [senderID, receiverID, receiverID, senderID],
      (error, results, fields) => {
        if (error) {
          res.status(400).json({
            success: 0,
            message: error,
          });
        } else {
          res.status(200).json({
            success: 1,
            data: results,
          });
        }
      }
    );
  },
};
