//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./modules/database"); //load db.js
const shops = require("./modules/locations"); //load locations.js
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
  let locationsList = await shops.getShops();
  // initialize the shop if there are no items
  if (!itemsList.length) {
    await db.initializeItems();
    itemsList = await db.getItems().json();
  };
  if (!locationsList.length) {
    await shops.initializeLocations();
    locationsList = await shops.getShops().json();
  }
  // console.log(itemsList);
  // console.log(locationsList);
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
// add a second collection to house all locations
// have a button to direct the user to the stores view
// create a form that allows the addition of an item
// 
