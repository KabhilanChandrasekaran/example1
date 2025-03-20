import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    // vanue: {
    //   type: String,
    //   required: true,
    // },
    screen: {
      type: Array,
      required: true,
      default: [], // Initialize as an empty array
    },
    date: {
      type: String,
      set: (date) => new Date(date).toString(), // Converts the date to desired string format
    },
    time: {
      type: String,
      required: true,
    },
    allocatedPersonCount: {
      type: Number,
      required: true,
    },
    availableSeatCount: {
      type: Number,
      required: true,
    },
    bookedSeatsArray: {
      type: Array,
      required: true,
      default: [], // Initialize as an empty array
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MovieProgram = mongoose.model("movieAdding", movieSchema);
