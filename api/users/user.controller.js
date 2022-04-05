const {
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./user.service");
const { hashSync, genSaltSync } = require("bcrypt");
const { compareSync } = require("bcrypt");
const pool = require("../../config/database");

module.exports = {
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
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
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
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
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },
  changePassword: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.Email, (err, results) => {
      if (err) {
        console.log(err);
      }

      const result = compareSync(body.OldPassword, results.password);

      if (result) {
        const salt = genSaltSync(10);
        body.NewPassword = hashSync(body.NewPassword, salt);

        pool.query(
          `update user set password=? where email=?`,
          [body.NewPassword, body.Email],
          (error, results, fields) => {
            if (error) {
              console.log(error);
            } else {
              res.json({
                success: 1,
                message: "Password Successfully Changed",
                result: results,
              });
            }
          }
        );
      } else {
        return res.json({
          success: 0,
          message: "Invalid Old Password",
        });
      }
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
