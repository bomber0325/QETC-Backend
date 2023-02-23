// Anasite - Edits: setting up routes
const express = require("express");
//  const controller = require('../../../controllers/front/university.controller')
const controller = require("../../../controllers/front/programlevel.controller");
const router = express.Router();

router.route("/createProgramLevel").post(controller.createProgramme);
router.route("/listProgramLevels").get(controller.listProgrammes);
router.route("/edit").put(controller.edit);
router.route("/delete/:id").delete(controller.delete);
router.route("/get/:id").get(controller.get);
// router.findAll();

module.exports = router;
