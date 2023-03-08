const db = require("../../models");
const University = db.University;
const Campus = db.Campus;
const Activity = db.Activity;

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// create university
exports.create = async (req, res, next) => {
  try {
    console.log("REq.body", req.body);
    console.log("req file", req.file);
    //create new record in db
    let university = {
      image: req?.file?.filename,
      name: req.body.name,
      type: req.body.type,
      counserllerName: req.body.counserllerName,
      phone: req.body.phone,
      email: req.body.email,
      visaAppFee: req.body.visaAppFee,
      addmissionFee: req.body.addmissionFee,
      qetcFee: req.body.qetcFee,
      commisionDuration: req.body.commisionDuration,
    };
    university = await University.create(university);
    console.log("universityId", university.dataValues.id);
    console.log("campuss", req.body.campuses);

    const newArr = JSON.parse(req.body.campuses);
    const mappedArr = newArr.map(async (ele, ind) => {
      let campus = {
        name: ele.name,
        address1: ele.address1,
        address2: ele.address2,
        phone: ele.phone,
        email: ele.email,
        isMain: ele.isMain,
        UniversityId: university.dataValues.id,
      };
      campus = await Campus.create(campus);
    });

    await Activity.create({ action: "New University Created", name: payload.Uname, role: payload.role });
    return res.send({
      success: true,
      data: university,
      message: "university created successfully",
    });
  } catch (err) {
    console.log("Error handling =>", err);
    next();
  }
};

exports.listUniversity = async (req, res, next) => {
  // console.log("req.query",req.query);
  try {
    const uni = await University.findAndCountAll();
    let { page, limit, name } = req.query;

    const filter = {};

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    if (name) {
      filter.name = {
        [Op.like]: "%" + name + "%",
      };
    }

    const total = uni.count;

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    const faqs = await University.findAll({
      order: [["updatedAt", "DESC"]],
      offset: limit * (page - 1),
      limit: limit,
      where: filter,
      include: [
        {
          model: Campus,
          as: "Campuses",
        },
      ],
    });

    return res.send({
      success: true,
      message: "Universities fetched successfully",
      data: {
        faqs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit) <= 0 ? 1 : Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    res.send("University Error " + err);
  }
};

// API to edit University
exports.edit = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.file) {
      const image = req?.file?.filename;
      payload[`logo`] = image;
    }
    console.log("payload", req.file, req.file);
    const university = await University.update(
      // Values to update
      payload,
      {
        // Clause
        where: {
          id: payload.id,
        },
      }
    );

    const newArr = JSON.parse(req.body.campuses);
    console.log(payload, newArr);
    const mappedArr = newArr.map(async (ele, ind) => {
      let campus = {
        name: ele.name,
        address1: ele.address1,
        address2: ele.address2,
        phone: ele.phone,
        email: ele.email,
        isMain: ele.isMain,
        UniversityId: payload.id,
      };
      console.log("campssssssssa", campus);
      campus = await Campus.update(
        // Values to update
        campus,
        {
          // Clause
          where: {
            id: ele.id,
          },
        }
      );
    });

    await Activity.create({ action: "University updated", name: payload.Uname, role: payload.role });
    return res.send({
      success: true,
      message: "University updated successfully",
      university,
    });
  } catch (error) {
    return next(error);
  }
};

// API to delete university
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const university = await University.destroy({ where: { id: id } });
      const campuses = await Campus.destroy({
        where: { UniversityId: id },
      });

      await Activity.create({ action: "University deleted", name: payload.Uname, role: payload.role });
      if (university)
        return res.send({
          success: true,
          message: "university Page deleted successfully",
          id,
        });
      else
        return res.status(400).send({
          success: false,
          message: "university Page not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "university Id is required" });
  } catch (error) {
    return next(error);
  }
};

// API to get a University
exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const university = await University.findByPk(id);
      const campuses = await Campus.findAll({
        where: { UniversityId: university.id },
      });

      university.dataValues.campuses = campuses;

      if (university)
        return res.json({
          success: true,
          message: "university retrieved successfully",
          university,
        });
      else
        return res.status(400).send({
          success: false,
          message: "University not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "University Id is required" });
  } catch (error) {
    return next(error);
  }
};
