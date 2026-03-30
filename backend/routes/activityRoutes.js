const router = require("express").Router();
const ctrl = require("../controllers/activityController");

router.get("/", ctrl.getActivities);
router.post("/", ctrl.addActivity);
router.put("/:id", ctrl.updateActivity);
router.delete("/:id", ctrl.deleteActivity);

module.exports = router;