// Anasite - Edits: setting up routes
const express = require("express");
//  const controller = require('../../../controllers/front/university.controller')
const controller = require("../../../controllers/front/programcategory.controller");
const router = express.Router();

router.route("/createProgramCategory").post(controller.createProgramCategory);
router.route("/listProgramCategorys").get(controller.listProgramCategorys);
router.route("/edit").put(controller.edit);
router.route("/delete/:id").delete(controller.delete);
router.route("/get/:id").get(controller.get);
// router.findAll();

module.exports = router;
