const pool = require("../../database/config");


module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users(username, password) 
                      values(?,?)`,
            [
              data.username,
              data.password
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