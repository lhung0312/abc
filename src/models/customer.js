const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,
    email: String,
    img: String,
    description: String,
  },
  {
    timestamps: true,
    static: {
      findByHoiDanIt(name) {
        return this.find({ name: new RegExp(name, "i") });
      },
    },
  }
);
customerSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
