import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

const ShowMovie = () => {
  const [movieProgram, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Show Movie</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{movieProgram._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Movie Name</span>
            <span>{movieProgram.movieName}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Screen</span>
            <span>{movieProgram.screen}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Date</span>
            <span>{movieProgram.date}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Time</span>
            <span>{movieProgram.time}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Total Allocated Seats
            </span>
            <span>{movieProgram.allocatedPersonCount}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Availabe Seats</span>
            <span>{movieProgram.availableSeatCount}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Price</span>
            <span>{movieProgram.price}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(movieProgram.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(movieProgram.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMovie;
