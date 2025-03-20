// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";

import MovieProgramPage from "./pages/Movies/Movie";
import CreateMovies from "./pages/Movies/CreateMovies";
import ShowMovie from "./pages/Movies/ShowMovie";
import EditMovie from "./pages/Movies/EditMovie";
import DeleteMovie from "./pages/Movies/DeleteMovie";
import MovieLanding from "./pages/Movies/MovieLanding";

import MovieView from "./pages/Movies/MovieView";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/movieLanding" element={<MovieLanding />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>

      <Routes>
        <Route path="/movies" element={<MovieProgramPage />} />
        <Route path="/movieViews" element={<MovieView />} />
        <Route path="/movies/create" element={<CreateMovies />} />
        <Route path="/movies/details/:id" element={<ShowMovie />} />
        <Route path="/movies/edit/:id" element={<EditMovie />} />
        <Route path="/movies/delete/:id" element={<DeleteMovie />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
