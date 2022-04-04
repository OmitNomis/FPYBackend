const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into user(firstName, lastName, email, password, phone, city, countryId, startDate) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.FirstName,
        data.LastName,
        data.Email,
        data.Password,
        data.Phone,
        data.City,
        data.CountryId,
        data.StartDate,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
