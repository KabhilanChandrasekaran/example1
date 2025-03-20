import { useState } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMovies = () => {
  const [movieName, setMovieName] = useState("");
  // const [vanue, setVanue] = useState("");
  const [screen, setScreen] = useState([]);
  const [date, setMovieDate] = useState("");
  const [time, setMovieTime] = useState("");
  const [allocatedPersonCount, setPersonCount] = useState("");
  const [availableSeatCount, setSeatCount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Available screen options
  const screenOptions = ["S1", "S2", "S3"];

  // Handle checkbox change for screens
  const handleScreenChange = (screenValue) => {
    setScreen((prevScreens) => {
      if (prevScreens.includes(screenValue)) {
        // Remove the screen if already selected
        return prevScreens.filter((s) => s !== screenValue);
      } else {
        // Add the screen if not selected
        return [...prevScreens, screenValue];
      }
    });
    // Clear any errors for screen
    setErrors((prevErrors) => ({ ...prevErrors, screen: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate event name
    if (!movieName) {
      newErrors.movieName = "Event name is required";
    }

    // // Validate venue
    // if (!vanue) {
    //   newErrors.vanue = "Venue is required";
    // }

    // Validate screen
    if (screen.length === 0) {
      newErrors.screen = "At least one screen must be selected";
    }

    // Validate date
    if (!date) {
      newErrors.date = "Date is required";
    }

    // Validate time
    if (!time) {
      newErrors.time = "Time is required";
    }

    // Validate ticket price (cannot be negative)
    if (!allocatedPersonCount) {
      newErrors.allocatedPersonCount = "Person count is required";
    } else if (allocatedPersonCount < 0) {
      newErrors.allocatedPersonCount = "Person count cannot be negative";
    }

    // Validate ticket price (cannot be negative)
    if (!availableSeatCount) {
      newErrors.availableSeatCount = "Availabe count is required";
    } else if (availableSeatCount < 0) {
      newErrors.availableSeatCount = "Availabe count cannot be negative";
    } else if (availableSeatCount > allocatedPersonCount) {
      newErrors.availableSeatCount =
        "Availabe count cannot be greater than allocated count";
    }

    // Validate ticket price (cannot be negative)
    if (!price) {
      newErrors.price = "Ticket price is required";
    } else if (price < 0) {
      newErrors.price = "Ticket price cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSaveMovie = () => {
    if (!validateForm()) {
      alert("Please fix the errors before submitting");
      return;
    }

    // Explicitly format the date as YYYY-MM-DD
    const formattedDate = date; // The date input already gives us YYYY-MM-DD

    const data = {
      movieName,
      // vanue,
      screen,
      date: formattedDate,
      time,
      allocatedPersonCount,
      availableSeatCount,
      price,
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/movies", data)
      .then(() => {
        setLoading(false);
        navigate("/movies");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg my-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Movie</h1>
        {loading ? <Spinner /> : ""}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Movie Name</label>
            <input
              type="text"
              value={movieName}
              onChange={(e) => {
                setMovieName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, movieName: "" })); // Clear error for movieName
              }}
              className={`w-full mt-1 p-2 border ${
                errors.movieName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.movieName && (
              <p className="text-red-500">{errors.movieName}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-gray-700">Venue</label>
            <input
              type="text"
              value={vanue}
              onChange={(e) => {
                setVanue(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, vanue: "" })); // Clear error for venue
              }}
              className={`w-full mt-1 p-2 border ${
                errors.vanue ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.vanue && <p className="text-red-500">{errors.vanue}</p>}
          </div> */}

          <div>
            <label className="block text-gray-700">Screen</label>
            <div className="flex gap-4 mt-1">
              {screenOptions.map((screenOption) => (
                <div key={screenOption} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`screen-${screenOption}`}
                    checked={screen.includes(screenOption)}
                    onChange={() => handleScreenChange(screenOption)}
                    className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`screen-${screenOption}`} className="ml-2">
                    {screenOption}
                  </label>
                </div>
              ))}
            </div>
            {errors.screen && <p className="text-red-500">{errors.screen}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setMovieDate(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, date: "" })); // Clear error for date
              }}
              className={`w-full mt-1 p-2 border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setMovieTime(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, time: "" })); // Clear error for time
              }}
              className={`w-full mt-1 p-2 border ${
                errors.time ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.time && <p className="text-red-500">{errors.time}</p>}
          </div>

          <div>
            <label className="block text-gray-700">
              Total Allocated Persons
            </label>
            <input
              type="number"
              value={allocatedPersonCount}
              onChange={(e) => {
                setPersonCount(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  allocatedPersonCount: "",
                })); // Clear error for price
              }}
              className={`w-full mt-1 p-2 border ${
                errors.allocatedPersonCount
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.allocatedPersonCount && (
              <p className="text-red-500">{errors.allocatedPersonCount}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Availabe Seats</label>
            <input
              type="number"
              value={availableSeatCount}
              onChange={(e) => {
                setSeatCount(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  availableSeatCount: "",
                })); // Clear error for price
              }}
              className={`w-full mt-1 p-2 border ${
                errors.availableSeatCount ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.availableSeatCount && (
              <p className="text-red-500">{errors.availableSeatCount}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, price: "" })); // Clear error for price
              }}
              className={`w-full mt-1 p-2 border ${
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>

          <div className="mt-4">
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSaveMovie}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovies;
