//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./modules/database"); //load db.js
const { response } = require("express");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //need for parsing JSON data from requests

//PAGE ROUTES
// initialize db and save results as JSON to a array
app.get("/", async (request, response) => {
  // get items
  let itemsList = await db.getItems();
  // initialize the shop if there are no items
  if (!itemsList.length) {
    await db.initializeShop();
    itemsList = await db.getItems().json();
    }
  console.log(itemsList);
  // render the page afterwards
  response.render("index", { title: "Shop", items: itemsList });
});

const newItem = {
  name: "pencil case",
  description: "holder of pencils and other things.",
  price: 5.99,
  stock: 2
};

app.get("/addItem", async (request, response) => {
  await db.addItem(newItem);
  response.redirect("/");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// to do:
// add a second colleciton to house all transactions
// add a third for in cart
// make views that allow users to add an item to cart
// once user adds to cart add the log to the cart database
// once the user goes to checkout create a new view that shows the items added to cart
// create checkout view that has form for users to input information
// once submitted, redirect to home
// reduce stock of the item by 1
// new transaction with user's submitted data
