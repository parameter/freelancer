const mongoose = require("mongoose");
// const dbConfig = require("../config/db.config.js");

const requestSchema = new mongoose.Schema({
    product: String,
    budget: Number,
    amount: Number
});

const RequestDB = mongoose.model(
    "request",
    mongoose.Schema(
      {
        category: String,
        requests: []
      },
      { timestamps: true }
    )
);

module.exports = mongoose.models.request || RequestDB;