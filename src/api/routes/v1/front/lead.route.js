const express = require("express");
const controller = require("../../../controllers/front/lead.controller");
const router = express.Router();
const { uploadSingle } = require("../../../utils/upload");

router.route("/createLead").post(uploadSingle, controller.createLead);
router.route("/listLead").get(controller.listLead);
router.route("/edit").put(uploadSingle, controller.edit);
router.route("/delete/:id").delete(controller.delete);
router.route("/get/:id").get(controller.get);

module.exports = router;
