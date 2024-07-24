import sampleData from "./data";
import Scheme from "../models/Scheme";
import mongoose from "mongoose";
const DB_URL =
  "mongodb+srv://Adhish:kCxYFhGcZCrzaD1u@cluster0.pndh2oh.mongodb.net/Farmersworld?retryWrites=true&w=majority&appName=Cluster0";

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
  await Scheme.deleteMany({}).then(() => console.log("deleted"));
  let scheme = await Scheme.insertMany(sampleData)
    .then(() => {
      console.log("Data inserted");
    })
    .catch((err) => console.log(err));
}

insertData();
