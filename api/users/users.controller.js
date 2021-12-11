
const { create, getUserByUserEmail, saveFile, getPictureByEmail, createBadge, getBadgesByUserEmail } = require("./users.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const path = require('path');
const fs = require('fs');


module.exports = {
    //create user
    createUser: (req, res) => {
        const body = req.body;
        // password encryption
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createBadge(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results);
            }
        })

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    // login
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                return res.json({
                    success: 1,
                    message: "login successfully"
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    },
    // Upload profile picture
    uploadProfilePicture: (req, res) => {
        var body = req.file;
        body.email = req.body.email;
        saveFile((body), (err, results) => {
            if (err) {
                console.log("point A", err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "user does not exist"
                })
            }
            if (results) {
                return res.json({
                    success: 1,
                    message: "profile picture uploaded"
                })
            }
        })
    },
    // send profile picture back
    sendProfilePicture: (req, res) => {
        const body = req.headers;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "user not found"
                })
            }
            if (results) {
                var filename = results.profile_picture.substring(results.profile_picture.lastIndexOf('/') + 1);
                var fullPath = `${__dirname}/uploads/${filename}`;

                fs.stat(fullPath, function (err) {
                    if (!err) {
                        res.sendFile(fullPath);
                    }
                    else if (err.code === 'ENOENT') {
                        res.sendFile(`${__dirname}/img/profile.png`);
                    }
                });

            }
            else {
                return res.json({
                    success: 0,
                    data: "something went wrong"
                });
            }
        });
        //res.sendFile(__dirname + '/uploads/' + results.profile_picture);
    },
    // send badges of user
    sendUserBadges: (req, res) => {
        const body = req.headers;
        getBadgesByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "user not found"
                })
            }
            if (results) {
                return res.json({
                    success: 1,
                    data: {
                        "badges": results.map(badge => badge.badge_image)
                    }
                });
            }
            else {
                return res.json({
                    success: 0,
                    data: "something went wrong"
                });
            }
        });
    },
    // send profile picture back
    userDetails: (req, res) => {
        const body = req.headers;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "user not found"
                })
            }
            if (results) {
                return res.json({
                    success: 1,
                    username: results.username
                })
            }
            else {
                return res.json({
                    success: 0,
                    data: "something went wrong"
                });
            }
        });
    },
}

