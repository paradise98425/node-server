const router = require("express").Router();
const multer = require("multer");
const { createUser, login, uploadProfilePicture } = require("./users.controller");
const upload = multer({ dest: "uploads/" });


router.post("/registration", createUser);
router.post("/login", login);
router.put("/upload", upload.single("profile_picture"), uploadProfilePicture)

module.exports = router;