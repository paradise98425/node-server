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
  logoutUser: (email, callBack) => {
    const login_status = false
    pool.query(
      `update users set login_status = 0 where users.email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  loginUser: (email, callBack) => {
    const login_status = false
    pool.query(
      `update users set login_status = 1 where users.email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  //insert new badge for user
  createBadge: (userId, callBack) => {
    const basicBadgeImage = "frellsen_badge.png";

    pool.query(
      `insert into badges(badge_name, badge_type, badge_image) 
          values("registration-badge","basic","static/badges/${basicBadgeImage}")`,
      [
        userId
      ],
      (error, results2, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results2);
      }
    );
  },

  createUserSignupAchievements: (userId, callBack) => {
    pool.query(
      `insert into user_achievements(user_id, point_id) 
          values(?,(SELECT ps.id FROM points ps INNER JOIN badges bd on ps.badge_id = bd.id WHERE bd.badge_type = "SIGNUP" and ps.location_id is null))`,
      [
        userId
      ],
      (error, results2, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results2);
      }
    );
  },

  createUserVisitAchievements: (email, qrcode, callBack) => {
    pool.query(
      `insert into user_achievements(user_id, point_id) values((SELECT usr.id from users usr where usr.email = ?),(SELECT ps.id FROM points ps INNER JOIN badges bd on ps.badge_id = bd.id INNER JOIN location ln ON ln.id = ps.location_id WHERE bd.badge_type = "VISIT" and ps.location_id = (SELECT qs.location_id FROM qr_setup qs  WHERE qs.qr_code = ?)));`,
      [
        email,
        qrcode
      ],
      (error, results2, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results2);
      }
    );
  },

  getAllUserVisitedLocations: (email, callBack) => {
    pool.query(
      `select ln.location_name,ln.location_address,ln.image,ln.latitude,ln.longitude from visited_location vl INNER JOIN users ur on ur.id = vl.user_id INNER JOIN location ln on ln.id = vl.location_id where ur.email = ? order by vl.scanned_date LIMIT 4`,
      [
        email
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        else {
          return callBack(null, results);
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
      `select bdg.badge_name, bdg.badge_type,bdg.badge_image from user_achievements ua INNER JOIN points pt on pt.id = ua.point_id INNER JOIN badges bdg on pt.badge_id = bdg.id 
      INNER JOIN users us on us.id = ua.user_id where us.email = ?`,
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
  },
  createUservisitedLocation: (userEmail, qrCode, callBack) => {
    pool.query(
      `insert into visited_location(user_id, location_id) values((SELECT usr.id from users usr where usr.email = ?),(SELECT qs.location_id FROM qr_setup qs  WHERE qs.qr_code = ?));`,
      [
        userEmail,
        qrCode
      ],
      (error, results2) => {
        if (error) {
          callBack(error);
        }
        else {
          return callBack(null, results2);
        }
      }
    );
  },
}