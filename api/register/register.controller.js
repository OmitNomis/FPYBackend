const { create } = require("./register.service");
const { hashSync, genSaltSync } = require("bcrypt");
const { getUserByUserEmail, getUserByPhone } = require("../users/user.service");

module.exports = {
  register: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    var emailExists;
    var phoneExists;
    getUserByUserEmail(body.Email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        emailExists = true;
        return res.status(200).json({
          status: 0,
          message: "Email already registered",
        });
      } else {
        emailExists = false;
      }
      if (emailExists == false) {
        getUserByPhone(body.Phone, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (results.length > 0) {
            phoneExists = true;
            return res.status(200).json({
              status: 0,
              message: "Phone Number already registered",
            });
          } else {
            phoneExists = false;
          }
          if (phoneExists == false) {
            console.log("hehe");
            body.Password = hashSync(body.Password, salt);
            create(body, (err, results) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  success: 0,
                  message: "Database connection errror",
                });
              }
              return res.status(200).json({
                success: 1,
                data: results,
                message: "Succesfully Registered",
              });
            });
          }
        });
      }
    });
  },
};
