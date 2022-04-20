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
  getExistingChat: (req, res) => {
    const id = req.params.id;
    var message = [];
    pool.query(
      `select max(messageID) as messageID from chatmessages group by senderID, receiverID having senderID = ? or receiverID = ? order by messageID desc;`,
      [id, id],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        } else {
          message = results.map((item) => item.messageID);
        }
      }
    );
    setTimeout(() => {
      if (message.length != 0) {
        pool.query(
          `select * from chatmessages where messageID in (?)`,
          [message],
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              res.status(200).json({
                success: 1,
                data: results,
              });
            }
          }
        );
      } else {
        res.status(200).json({
          success: 0,
          message: "No chat List Found",
        });
      }
    }, 100);
  },
};
