const pool = require("../../database/config");


module.exports = {
  // registration  
  create: (data, callBack) => {
    data.login_status = true
    data.profile_picture = "api/users/uploads/pp.png"
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
  },
  //insert new badge for user
  createBadge: (email, callBack) => {
    const basicBadgeImage = "frellsen_badge.png";
    pool.query(
      `insert into badges(badge_name, badge_type, badge_image, location_id, email) 
          values("registration-badge","basic","static/badges/${basicBadgeImage}","null",?)`,
      [
        email
      ],
      (error, results2, fields) => {
        if (error) {
          console.log("badge insertion error", error)
        }
        else {
          console.log("badge insertion success", results2);
        }
      }
    );
  },

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getBadgesByUserEmail: (email, callBack) => {
    pool.query(
      `select * from badges where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  saveFile: (data, callBack) => {
    pool.query(
      `update users set profile_picture=? where email=?`,
      [
        data.filename,
        data.email
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    )
  }
}