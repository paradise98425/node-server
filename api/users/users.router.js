const router = require("express").Router();
const multer = require("multer");
var fs = require('fs');
const { createUser, login, uploadProfilePicture, sendProfilePicture } = require("./users.controller");
const upload = multer({ dest: "api/users/uploads/" });


router.post("/registration", createUser);
router.post("/login", login);
router.put("/upload", upload.single("profile_picture"), uploadProfilePicture);
router.get("/profile-picture", sendProfilePicture);

module.exports = router;