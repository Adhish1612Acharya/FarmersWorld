import sampleData from "./data";
import Scheme from "../models/Scheme";
import mongoose from "mongoose";
const DB_URL = "mongodb://127.0.0.1:27017/farmersworld";

main()
  .then(() => {
    console.log(DB_URL);
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

async function insertData() {
  let scheme = await Scheme.insertMany(sampleData)
    .then(() => {
      console.log("Data inserted");
    })
    .catch((err) => console.log(err));
}

// insertData();
