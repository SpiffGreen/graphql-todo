import mongoose from "mongoose";
import config from "config";

export async function connectToMongo() {
  try {
    await mongoose.connect(config.get("dbUri"));
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}