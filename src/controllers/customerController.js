const { uploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteACustomerService,
} = require("../services/customerService");
const Joi = require("joi");

module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      address: Joi.string(),

      phone: Joi.string().pattern(new RegExp("^[0-9]{8,10}$")),
      email: Joi.string().email(),
      description: Joi.string(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      //return error
      return res.status(200).json({
        msg: error,
      });
    } else {
      // console.log(">>>check result: ", result);

      let imageUrl = "";

      if (!req.files || Object.keys(req.files).length === 0) {
      } else {
        console.log(">>> check req.files: ", req.files);

        let result = await uploadSingleFile(req.files.img);
        imageUrl = result.path;
        console.log(">>> check result: ", imageUrl);
      }
      let customerData = {
        name,
        address,
        phone,
        email,
        description,
        img: imageUrl,
      };
      console.log(">>>customerData: ", customerData);

      let customer = await createCustomerService(customerData);
      return res.status(200).json({
        EC: 0,
        data: customer,
      });
    }

    // req.body => text       req.files =>> files
    // =>>> kiểm tra console.log xem có name ko
  },
  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  getAllCustomers: async (req, res) => {
    console.log(req.query);
    let limit = req.query.limit;
    let page = req.query.page;
    let name = req.query.name;

    let result = "";
    if (limit && page) {
      result = await getAllCustomerService(limit, page, name, req.query);
    } else {
      result = await getAllCustomerService();
    }
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putUpdateCustomer: async (req, res) => {
    let { name, address, phone, email, description, customerId } = req.body;
    let result = await putUpdateCustomerService(
      name,
      address,
      phone,
      email,
      description,
      customerId
    );
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },
  deleteACustomer: async (req, res) => {
    console.log("req.body>>: ", req.body);
    let ids = req.body.customersId;
    let result = await deleteACustomerService(ids);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },
};
