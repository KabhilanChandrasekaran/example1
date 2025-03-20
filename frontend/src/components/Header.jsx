// src/components/Header.jsx
import { Link } from "react-router-dom";
//import logo from "../images/logo2.png"; // Import your logo image
import logo from "../images/logo3.jpg";

const Header = () => {
  return (
    <header className="bg-primary text-white p-4 text-xl">
      <nav className="container mx-auto flex justify-center items-center space-x-7">
        {/* Use space-x-4 for consistent spacing between all elements */}
        <img src={logo} alt="Logo" className="h-10 w-auto mr-5" />
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link to="/movieLanding" className="hover:text-gray-300">
          Movies
        </Link>

        <Link to="/returns/create" className="hover:text-gray-300">
          Return
        </Link>

        <Link to="/createtickets" className="hover:text-gray-300">
          Help
        </Link>
      </nav>
    </header>
  );
};

export default Header;
