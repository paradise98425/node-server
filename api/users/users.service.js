const pool = require("../../database/config");


module.exports = {
    create: (data, callBack) => {
        data.login_status = true
        data.profile_picture = "no picture"
        pool.query(
            `insert into users(username, password, email, login_status, profile_picture) 
                      values(?,?,?,?,?)`,
            [
              data.username,
              data.password,
              data.email,
              data.login_status,
              data.profile_picture
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    }
}