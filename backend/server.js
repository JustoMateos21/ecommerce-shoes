import express from "express";
import path from "path";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRouter.js";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import cors from "cors";
var app = express();

dotenv.config();
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/api", (req, res) => {
  res.send("api");
});

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
// );

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5500;
app.listen(`${port}`, () => {
  console.log(`listening on ${port}`);
});
