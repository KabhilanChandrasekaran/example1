import express from "express";
import { MovieProgram } from "../models/movieModel.js";

const router = express.Router();

// Route for saving a new movie
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.movieName ||
      // !request.body.vanue ||
      !request.body.screen ||
      !request.body.date ||
      !request.body.time ||
      !request.body.allocatedPersonCount ||
      !request.body.availableSeatCount ||
      !request.body.price
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: movieName, Screen, date, time, allocatedPersonCount, availableSeatCount, price",
      });
    }
    const newMovie = {
      movieName: request.body.movieName,
      // vanue: request.body.vanue,
      screen: request.body.screen,
      date: request.body.date,
      time: request.body.time,
      allocatedPersonCount: request.body.allocatedPersonCount,
      availableSeatCount: request.body.availableSeatCount,
      bookedSeatsArray: [], // Initialize as an empty array
      price: request.body.price,
    };
    const movieProgram = await MovieProgram.create(newMovie);
    return response.status(201).send(movieProgram);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all movies from the DB
router.get("/", async (request, response) => {
  try {
    const movies = await MovieProgram.find({});
    return response.status(200).json({
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting a single movie by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const movieProgram = await MovieProgram.findById(id);
    return response.status(200).json(movieProgram);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for updating an movie
router.put("/:id", async (request, response) => {
  try {
    console.log("Incoming Update Request:", request.body);

    if (
      !request.body.movieName ||
      // !request.body.vanue ||
      !request.body.date ||
      !request.body.time ||
      !request.body.screen ||
      !request.body.allocatedPersonCount || // Keep required fields but NOT availableSeatCount
      !request.body.price
    ) {
      console.error("Update failed: Missing required fields", request.body);
      return response.status(400).send({
        message:
          "Send all required fields: movieName, Screen, date, time, allocatedPersonCount, price",
      });
    }

    const { id } = request.params;

    // Only update allocatedPersonCount and other necessary fields
    const result = await MovieProgram.findByIdAndUpdate(
      id,
      {
        movieName: request.body.movieName,
        // vanue: request.body.vanue,
        screen: request.body.screen,
        date: request.body.date,
        time: request.body.time,
        allocatedPersonCount: request.body.allocatedPersonCount, // Only updating this field
        price: request.body.price,
      },
      { new: true }
    );

    if (!result) {
      console.error("Update failed: Movie not found");
      return response.status(400).json({ message: "Movie not found" });
    }

    return response
      .status(200)
      .send({ message: "Movie updated successfully", movie: result });
  } catch (error) {
    console.error("Error updating movie:", error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

// Route for deleting an movie
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await MovieProgram.findByIdAndDelete(id);

    if (!result) {
      return response.status(400).json({ message: "Movie not found" });
    }

    return response.status(200).send({ message: "Movie deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
