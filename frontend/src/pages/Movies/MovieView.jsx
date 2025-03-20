import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Spinner from "../../components/Spinner";
import DarkModeToggle from "../../components/DarkModeToggle";

import TypingAnimation from "../../components/TypingAnimation";
import GridPattern from "../../components/GridPatternBG";

import b1 from "../../images/xmen.jpg";
import b2 from "../../images/bat.jpg";
import b3 from "../../images/hulk.jpg";

const MovieProgramPage = () => {
  const [moviesPrograms, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [b1, b2, b3];

  const navigate = useNavigate(); // Initialize useNavigate
  const [startDate, setStartDate] = useState(""); // Start date for filter
  const [endDate, setEndDate] = useState(""); // End date for filter

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/movieViews")
      .then((response) => {
        setMovies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  useEffect(() => {
    const isDarkMode = document.body.classList.contains("dark");
    setDarkMode(isDarkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setDarkMode(document.body.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect(); // Clean up on component unmount
  }, []);

  const filteredMovies = moviesPrograms.filter((movieP) => {
    const matchesSearchQuery = movieP.movieName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // Convert movieDate and startDate/endDate to Date objects for comparison
    const movieDate = new Date(movieP.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Check if movieDate falls within the selected date range
    const isWithinDateRange =
      (!start || movieDate >= start) && (!end || movieDate <= end);

    return matchesSearchQuery && isWithinDateRange;
  });

  const handleClick = (movie) => {
    // Navigate to the movie participants page with movie data
    navigate(`/movieViews/movieParticipants`, {
      state: {
        movieName: movie.movieName,
        movieDate: movie.date,
        screen: movie.screen,
        totalAllocatedPerson: movie.allocatedPersonCount,
        availableSeatCount: movie.availableSeatCount,
        bookedSeatsArray: movie.bookedSeatsArray,
        ticketPrice: movie.price,
      },
    });
  };

  return (
    <div className="relative min-h-screen p-4 font-mono overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={2}
        className="absolute inset-0 z-0"
        maxOpacity={0.5}
        duration={4}
        repeatDelay={0.5}
        fillColor={
          darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
        }
        strokeColor={
          darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
        }
      />
      <div className="p-4 font-mono">
        <div className="my-4">
          <img
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="w-full h-90 object-cover rounded-md shadow-md"
          />
        </div>
           <TypingAnimation
          text="Welcome To SkyLight 3D Cinemas Kaduwela"
          duration={25}
          className={`text-2xl font-bold mb-8 ${
            darkMode ? "text-white" : "text-[#5046e6]"
             }`}
            />
        <div className="flex items-center my-8">
          <div className="flex items-center gap-4">
           <DarkModeToggle />
          </div>
          <h1
          className={`text-3xl font-bold mx-auto ${darkMode ? "text-white" : "text-black"}`}
          >
          Now Showing
        </h1>
      </div>
        {/* cl3d */}
        <div
          className={`bg-[#beedc1] p-4 rounded-lg shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by movie name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`border border-gray-500 px-4 py-2 w-full max-w-xs rounded-md ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
            />
            {/* New Filter with reduced gap */}
            <div className="flex items-center gap-2 ml-4">
              <div>
                <label className="mr-1 text-black">From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`border border-gray-500 px-4 py-2 rounded-md ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                />
              </div>
              <div>
                <label className="mr-1 text-black">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`border border-gray-500 px-4 py-2 rounded-md ${
                    darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
                  }`}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
              {filteredMovies.map((movieP) => (
                <div
                  key={movieP._id}
                  className={`relative p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                    darkMode ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  {movieP.availableSeatCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-4xl opacity-80">
                      SOLD OUT
                    </div>
                  )}
                  <div
                    className={`${
                      movieP.availableSeatCount === 0
                        ? "pointer-movies-none"
                        : "cursor-pointer"
                    }`}
                    onClick={() =>
                      movieP.availableSeatCount > 0 && handleClick(movieP)
                    }
                  >
                    <h2
                      className={`text-xl font-bold mb-2 ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {movieP.movieName}
                    </h2>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Available Screens:</strong> {movieP.screen}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Date:</strong> {movieP.date}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Time:</strong> {movieP.time}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Total Allocated Persons:</strong>{" "}
                      {movieP.allocatedPersonCount}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Availabe Seats:</strong>{" "}
                      {movieP.availableSeatCount}
                    </p>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <strong>Price:</strong> {movieP.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieProgramPage;
