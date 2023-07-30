import express, { urlencoded } from "express";
import cors from "cors";
import { exec } from "child_process";
const app = express();
import { dbConnection } from "./database/DbConnection.js";
import { productRouter } from "./controller/products.js";
import { sellerRouter } from "./controller/seller.js";
import { offerRouter } from "./controller/offer.js";
import { bazarRouter } from "./controller/bazar.js";

// sets routes to different files to keep main.js clean
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", productRouter);
app.use("/api", sellerRouter);
app.use("/api", offerRouter);
app.use("/api", bazarRouter);

//sequrity stuff to allow the frontend to call backend on the right port
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3000/sample.pdf",
    ],
  })
);

//api auf homepage verlinken
app.get("/", (req, res) => {
  res.send("http://localhost:8080/api");
});

//sets the browser to fullscreen -> App Feeling
const command = `open -a "Google Chrome" --args --start-fullscreen --app="http://localhost:3000"`;
exec(command, (error) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
  }
});

//connects to default Database (Bazarify)
dbConnection.connectToDB();
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
