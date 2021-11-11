const router = require("express").Router();
const { createUser } = require("./users.controller");

router.post("/registration", createUser);

module.exports = router;