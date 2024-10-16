const mongoose = require("mongoose");

// connect to the DB
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const ShopSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number
  });

  const Shop = mongoose.model("Shop", ShopSchema);

//MONGODB FUNCTIONS
async function connect() {
    await mongoose.connect(dbUrl); //connect to mongodb
}

// initialize the database
async function initializeShop() {
    const itemsList = [
      {
        name: "Phone Stand",
        description: "Magsafe compatible phone stand to keep your phone upright and facing you to keep you handsfree and productive.",
        price: 12.99,
        stock: 13
      },
      {
        name: "Water Bottle",
        description: "Double insulated Water Bottle with straw.",
        price: 43.99,
        stock: 7
      },
      {
        name: "Laptop Charger",
        description: "70W chargin brick and USB-C to USB-C cable.",
        price: 35.99,
        stock: 29
      }
    ]
    await Shop.insertMany(itemsList);
  }

  // get all the items in the shop collection
  async function getItems() {
    await connect();
    return await Shop.find({}).sort(); //return array for find all
  };

  // add one hard coded item to db
  async function addItem(obj) {
    await Shop.create(obj);
  }

module.exports = {
    getItems,
    initializeShop,
    addItem
};