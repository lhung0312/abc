const Customer = require("../models/customer.js");
const aqp = require("api-query-params");
module.exports = {
  createCustomerService: async (customerData) => {
    console.log(">>>customerData: ", customerData);
    try {
      let result = await Customer.create({
        name: customerData.name,
        address: customerData.address,
        phone: customerData.phone,
        email: customerData.email,
        description: customerData.description,
        img: customerData.img,
      });

      return result;
    } catch (error) {
      console.log(">>>error: ", error);
      return null;
    }
  },
  createArrayCustomerService: async (arr) => {
    try {
      let result = await Customer.insertMany(arr);
      return result;
    } catch (error) {
      console.log(">>error: ", error);
      return null;
    }
  },
  getAllCustomerService: async (limit, page, name, queryString) => {
    try {
      let result = "";
      if (limit && page) {
        let offset = (page - 1) * limit;
        const { filter, skip } = aqp(queryString);
        delete filter.page;
        console.log(">>>check filter: ", filter);

        result = await Customer.find(filter).skip(offset).limit(limit).exec();
      } else {
        result = await Customer.find({});
      }

      return result;
    } catch (error) {
      console.log(">>error: ", error);
      return null;
    }
  },
  putUpdateCustomerService: async (
    name,
    address,
    phone,
    email,
    description,
    customerId
  ) => {
    try {
      let customer = await Customer.updateOne(
        { _id: customerId },
        {
          name: name,
          address: address,
          phone: phone,
          email: email,
          description: description,
        }
      );
      return customer;
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  },
  deleteACustomerService: async (arrIds) => {
    try {
      let result = await Customer.delete({ _id: { $in: arrIds } });
      return result;
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  },
};
