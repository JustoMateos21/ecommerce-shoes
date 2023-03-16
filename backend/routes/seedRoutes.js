import express from "express";
import Product from "../models/productModel.js";
import shoes from "../shoesData.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(shoes);
});

export default seedRouter;
