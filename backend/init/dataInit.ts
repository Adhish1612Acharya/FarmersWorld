const { data } = require("./data.js");
const Scheme = require("../models/Scheme.js");
const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/farmersworld";

main()
  .then(console.log("DB CONNECTED"))
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

async function insertData() {
  let scheme = new Scheme({
    heading: "Drone Technology",
    shortDescription: "Precision farming.",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.dDlBrv47rtQBVCsk-SlCKwHaEK&pid=Api&P=0&h=220",
    description:
      "The Drone Technology Scheme promotes the use of drones in agriculture for precision farming. Drones are used for monitoring crop health, spraying fertilizers and pesticides, and collecting data to optimize farming practices.",
    schemeType: "newTech",
  });
  await scheme.save();
}

insertData();
