const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: "Price must be greater than 0",
      },
    },
    category: { type: String, trim: true, default: "General" },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports