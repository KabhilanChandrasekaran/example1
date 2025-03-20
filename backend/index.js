import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import movieRoute from "./routes/movieRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

// Setup for ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("MERN Testing");
});

// Movie Routes
app.use("/movies", movieRoute);
app.use("/movieViews", movieRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
