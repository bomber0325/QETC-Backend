const db = require("../../models");
const Users = db.Users;
const Activity = db.Activity;
const { Branch } = db;

// create Branch
exports.create = async (req, res, next) => {
  try {
    let payload = req.body;
    //save the branch in db
    let user = await Users.create(payload);

    await Activity.create({ action: "User created", userId: 1 });

    return res.json({
      success: true,
      data: user,
      message: "user created successfully",
    });
  } catch (err) {
    next();
  }
};

// list users
exports.list = async (req, res, next) => {
  try {
    const user = await Users.findAndCountAll();
    let { page, limit, name } = req.query;
    const filter = {};

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    if (name) {
      filter.name = { $LIKE: name, $options: "gi" };
    }

    const total = user.count;

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    const faqs = await Users.findAll({
      order: [["updatedAt", "DESC"]],
      offset: limit * (page - 1),
      limit: limit,
      where: filter,
      include: [Branch],
    });
    console.log("faqs", faqs);
    // res.send(user);
    return res.send({
      success: true,
      message: "users fetched successfully",
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
    res.send("User  Error " + err);
  }
  // next();
};

// API to edit branch
exports.edit = async (req, res, next) => {
  try {
    let payload = req.body;
    const user = await Users.update(
      // Values to update
      payload,
      {
        // Clause
        where: {
          id: payload.id,
        },
      }
    );
    await Activity.create({ action: "User updated", userId: 1 });

    return res.send({
      success: true,
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    return next(error);
  }
};

// API to delete branch
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await Users.destroy({ where: { id: id } });
      await Activity.create({ action: "User deleted", userId: 1 });

      if (user)
        return res.send({
          success: true,
          message: "user  deleted successfully",
          id,
        });
      else
        return res.status(400).send({
          success: false,
          message: "user  not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "user Id is required" });
  } catch (error) {
    return next(error);
  }
};

// API to get  by id a branch
exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await Users.findByPk(id);

      if (user)
        return res.json({
          success: true,
          message: "user retrieved successfully",
          user,
        });
      else
        return res.status(400).send({
          success: false,
          message: "user not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "user Id is required" });
  } catch (error) {
    return next(error);
  }
};
