import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MovieProgramPage = () => {
  const [moviesPrograms, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [startDate, setStartDate] = useState(""); // Start date for filter
  const [endDate, setEndDate] = useState(""); // End date for filter

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/movies")
      .then((response) => {
        setMovies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Movie Programs Data", 14, 16);

    const tableColumn = [
      "No.",
      "Movie Name",
      "Screen",
      "Date",
      "Time",
      "Total Allocated Seats",
      "Available Seats",
      "Price",
    ];
    const tableRows = [];

    filteredMovies.forEach((movieP, index) => {
      const movieData = [
        index + 1,
        movieP.movieName,
        movieP.screen,
        movieP.date,
        movieP.time,
        movieP.allocatedPersonCount,
        movieP.availableSeatCount,
        movieP.price,
      ];
      tableRows.push(movieData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("movies-data.pdf");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Movie List</h1>
        <div className="flex items-center gap-4">
          <Link to="/movies/create">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add Movie
            </button>
          </Link>

          <Link to="/admin/dashboard">
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Admin Dashboard
            </button>
          </Link>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-lg text-gray-600">
          Total Movies: {filteredMovies.length}
        </h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by movie name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-500 px-4 py-2 w-full max-w-xs"
        />

        {/* New Filter */}
        <div>
          <label className="mr-2">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-500 px-4 py-2"
          />
        </div>

        <div>
          <label className="mr-2">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-500 px-4 py-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Download PDF
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-collapse">
          {" "}
          {/* Change to border-collapse for outlines */}
          <thead className="bg-gray-200">
            {" "}
            {/* Added light gray background */}
            <tr>
              <th className="border border-slate-600 p-2 text-left"></th>
              <th className="border border-slate-600 p-2 text-left max-md:hidden">
                Movie Name
              </th>

              <th className="border border-slate-600 p-2 text-left">
                Available Screens
              </th>
              <th className="border border-slate-600 p-2 text-left">Date</th>
              <th className="border border-slate-600 p-2 text-left">Time</th>
              <th className="border border-slate-600 p-2 text-left">
                Total Allocation
              </th>
              <th className="border border-slate-600 p-2 text-left">
                Available Seats
              </th>
              <th className="border border-slate-600 p-2 text-left">Price</th>
              <th className="border border-slate-600 p-2 text-left">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movieP, index) => (
              <tr key={movieP._id} className="h-8 even:bg-gray-100">
                {" "}
                {/* Added alternating row color */}
                <td className="border border-slate-700 text-center p-2">
                  {index + 1}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  {movieP.movieName}
                </td>
                <td className="border border-slate-700 text-center p-2 max-md:hidden">
                  {movieP.screen}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  {movieP.date}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  {movieP.time}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  {movieP.allocatedPersonCount}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  {movieP.availableSeatCount}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  {movieP.price}
                </td>
                <td className="border border-slate-700 text-center p-2">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/movies/details/${movieP._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/movies/edit/${movieP._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/movies/delete/${movieP._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MovieProgramPage;
