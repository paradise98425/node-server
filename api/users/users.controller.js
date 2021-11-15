
const { create, getUserByUserEmail, saveFile } = require("./users.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");


module.exports = {
    //create user
    createUser: (req, res) => {
        const body = req.body;
        // password encryption
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

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
            if(err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
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
        const body = req.file;
        saveFile(body, (err, results) => {
            if(err) {
                console.log("point A", err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "user does not exist"
                })
            }
            if(results) {
                return res.json({
                    success: 1,
                    message: "profile picture uploaded"
                })
            }
        })
    }
}

