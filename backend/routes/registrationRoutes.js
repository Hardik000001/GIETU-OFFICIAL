const router = require("express").Router();
const ctrl = require("../controllers/registrationController");

router.post("/register", ctrl.register);
router.get("/", ctrl.getAll);
router.get("/grouped", ctrl.getRegistrationsByActivity);

module.exports = router;