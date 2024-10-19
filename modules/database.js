const mongoose = require("mongoose");

// connect to the DB
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number
  });

  const Item = mongoose.model("items", ItemSchema);

//MONGODB FUNCTIONS
async function connect() {
    await mongoose.connect(dbUrl); //connect to mongodb
}

// initialize the database
async function initializeItems() {
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
    await Item.insertMany(itemsList);
  }

  // get all the items in the items collection
  async function getItems() {
    await connect();
    return await Item.find({}).sort(); //return array for find all
  };

  // add one hard coded item to db
  async function addItem(obj) {
    await Item.create(obj);
  }

  //delete an item from the db
  // async function deleteItem(obj) {
  //   await Item.deleteOne(obj);
  // }

module.exports = {
    getItems,
    initializeItems,
    addItem,
    // deleteItem
};