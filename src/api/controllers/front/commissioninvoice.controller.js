const db = require("../../models");
const CommissionInvoice = db.CommissionInvoice;
const Activity = db.Activity;
const { University, InvoiceModuleStatus, Branch } = db;
// create program categorys
exports.create = async (req, res, next) => {
  try {
    console.log("Req.body commissionInvoice controller =====>", req.body);
    //

    let commissionInvoice = {
      itemdate: req.body.itemdate,
      recipient: req.body.recipient,
      email: req.body.email,
      service: req.body.service,
      amount: req.body.amount,
      statusID: req.body.status,
      universityID: req.body.university,
      branchID: req.body.branch,
    };

    //save the commissionInvoice in db
    commissionInvoice = await CommissionInvoice.create(commissionInvoice);
    await Activity.create({
      action: "New commissionInvoice Created",
      userId: 1,
    });

    return res.json({
      success: true,
      data: commissionInvoice,
      // Activity,
      message: "commissionInvoice created successfully",
    });
  } catch (err) {
    // res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while creating the Tutorial."
    //   });
    console.log("Error handling =>", err);
    // console.log("catch block")
    next();
  }
};

// list program categorys
exports.list = async (req, res, next) => {
  try {
    const uni = await CommissionInvoice.findAndCountAll();
    let { page, limit, name } = req.query;

    console.log("unitt", uni.count);
    console.log("req.queryy", req.query); //name
    const filter = {};

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    if (name) {
      filter.name = { $LIKE: name, $options: "gi" };
    }

    const total = uni.count;

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    console.log("filter", filter);
    const faqs = await CommissionInvoice.findAll({
      order: [["updatedAt", "DESC"]],
      offset: limit * (page - 1),
      limit: limit,
      where: filter,
      include: [University, InvoiceModuleStatus, Branch],
    });
    console.log("faqs", faqs);
    // res.send(uni);
    return res.send({
      success: true,
      message: "commission invoice fetched successfully",
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
    res.send("commissionInvoice Error " + err);
  }
  // next();
};

// API to edit commissionInvoice
exports.edit = async (req, res, next) => {
  try {
    // let payload = req.body;
    let payload = {
      itemdate: req.body.itemdate,
      recipient: req.body.recipient,
      email: req.body.email,
      service: req.body.service,
      amount: req.body.amount,
      statusID: req.body.status,
      universityID: req.body.university,
      branchID: req.body.branch,
    };
    const commissionInvoice = await CommissionInvoice.update(
      // Values to update
      payload,
      {
        // Clause
        where: {
          id: payload.id,
        },
      }
    );
    await Activity.create({
      action: "New commissionInvoice updated",
      userId: 1,
    });

    return res.send({
      success: true,
      message: "commissionInvoice updated successfully",
      commissionInvoice,
    });
  } catch (error) {
    return next(error);
  }
};

// API to delete commissionInvoice
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const commissionInvoice = await CommissionInvoice.destroy({
        where: { id: id },
      });
      await Activity.create({
        action: " commissionInvoice deleted",
        userId: 1,
      });

      if (commissionInvoice)
        return res.send({
          success: true,
          message: "commissionInvoice Page deleted successfully",
          id,
        });
      else
        return res.status(400).send({
          success: false,
          message: "commissionInvoice Page not found for given Id",
        });
    } else
      return res.status(400).send({
        success: false,
        message: "commissionInvoice Id is required",
      });
  } catch (error) {
    return next(error);
  }
};

// API to get  by id a commissionInvoice
exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      console.log("oooooooooooooooooooooooo\n", CommissionInvoice);
      const commissionInvoice = await CommissionInvoice.findByPk(id);

      if (commissionInvoice)
        return res.json({
          success: true,
          message: "commissionInvoice retrieved successfully",
          commissionInvoice,
        });
      else
        return res.status(400).send({
          success: false,
          message: "commissionInvoice not found for given Id",
        });
    } else
      return res.status(400).send({
        success: false,
        message: "commissionInvoice Id is required",
      });
  } catch (error) {
    return next(error);
  }
};
