const router = require("express").Router();
const { createUser, login } = require("./users.controller");

router.post("/registration", createUser);
router.post("/login", login);

module.exports = router;