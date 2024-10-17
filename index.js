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
  // render the page
  response.render("index" );
});

// redirect paths
app.get("/items", async (request, response) => {
   // get items
  let itemsList = await db.getItems();
  // initialize the shop if there are no items
  if (!itemsList.length) {
    await db.initializeItems();
    itemsList = await db.getItems().json();
  };
  // render the page afterwards
  response.render("items", { title: "items", items: itemsList });
});
app.get("/stores", async (request, response) => {
   // get stores
   let locationsList = await shops.getShops();
  // initialize the locations if there are none
  if (!locationsList.length) {
    await shops.initializeLocations();
    locationsList = await shops.getShops().json();
  }
  // render the page afterwards
  response.render("stores", { title: "stores", stores: locationsList });
});

app.get("/addItemDetails", async (request, response) => {
  //render form to add item
  response.render("addItemDetails");
});

app.post("/addItem", async (request, response) => {
  // get form data from dom and store it into an object
  let req = request.body;
  let newItem = {
    name: req.name,
    description: req.description,
    price: req.price,
    stock: req.stock
  }

  //use mongoose's create to add the obj to the db
  await db.addItem(newItem);
  // redirect the user to items list
  response.redirect("/items");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

