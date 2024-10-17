const mongoose = require("mongoose");

// connect to the DB
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const LocationSchema = new mongoose.Schema({
    branch: String,
    address: String,
    hourOpen: Number,
    hourClose: Number,
    phone: String
  });

const Location = mongoose.model("locations", LocationSchema);

//MONGODB FUNCTIONS
async function connect() {
    await mongoose.connect(dbUrl); //connect to mongodb
}

// initialize the db
async function initializeLocations() {
    const locationsList = [
        {
            branch: "Toronto",
            address: "290 Bremner Blvd",
            hourOpen: 9,
            hourClose: 18,
            phone: "416-999-1020"
        },
        {
            branch: "Vancouver",
            address: "305 Water St",
            hourOpen: 8,
            hourClose: 20,
            phone: "604-231-9876"
        }
    ]
    await Location.insertMany(locationsList);
};

// get all the locations for the shops
async function getShops() {
    await connect();
    return await Location.find({}).sort();
};

module.exports = {
    getShops,
    initializeLocations
}