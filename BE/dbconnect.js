const mongoose = require("mongoose");

//setting connection
const dbconnect = async function () {
  try {
    await mongoose.connect('mongodb://localhost:27017/DigiSideKick', {
      useNewUrlParser: true,
    });

    return Promise.resolve("DB connection established!");
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};

//exporting connect promise
module.exports = dbconnect;
