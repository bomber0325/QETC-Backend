// all modules

const express = require("express");
// const { route } = require("./university.route");
const universityRoutes = require("./university.route");
const programmeRoutes = require("./programme.route");
const leadRoutes = require("./lead.route");
const applicantsRoute = require("./applicants.route");
const usersRoute = require("./users.route");
const backupsRoutes = require("./backups.route");
const PropertiesRoutes = require("./properties.route");
const currencieRoutes = require("./currencies.route");
const activitiesRoutes = require("./activities.route");
const branchRoutes = require("./branch.route");
const programLevel = require("./programlevel.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.use("/branch", branchRoutes);
router.use("/backups", backupsRoutes);
router.use("/properties", PropertiesRoutes);
router.use("/university", universityRoutes);
router.use("/programme", programmeRoutes);
router.use("/lead", leadRoutes);
router.use("/applicants", applicantsRoute);
router.use("/users", usersRoute);
router.use("/currencies", currencieRoutes);
router.use("/activities", activitiesRoutes);
// Anasite - Edits:
router.use("/programlevel", programLevel);

// currencieRoutes;
module.exports = router;
