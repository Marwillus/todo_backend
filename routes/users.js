var express = require("express");
var router = express.Router();

/* GET users listing. */
router.route("/").post(createUser);

router.route("/:id").delete(deleteUser);

router.route("/login").post(loginUser);

module.exports = router;
