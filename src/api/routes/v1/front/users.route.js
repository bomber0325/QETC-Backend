const express = require("express");
//  const controller = require('../../../controllers/front/university.controller')
// const controller = require('../../../controllers/front/users.controller');
const controller = require("../../../controllers/front/users.controller");

const router = express.Router();

// router.route("/createUser").post(controller.createUser);
// router.route("/listUsers").get(controller.listUsers)
router.route("/create").post(controller.create);
router.route("/list").get(controller.list);
router.route("/edit").put(controller.edit);
router.route("/delete/:id").delete(controller.delete);
router.route("/get/:id").get(controller.get);

router.route("/login").post(controller.login);
router.route("/signup").post(controller.signup);
router.route("/signout").post(controller.signout);

module.exports = router;
