const { getUserByUserEmail } = require("../users/user.service");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.Email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (results.length == 0) {
        return res.json({
          success: 0,
          data: "The email has not been registered",
        });
      }
      const result = compareSync(body.Password, results[0].password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1y",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          userData: results,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid Password",
        });
      }
    });
  },
};
