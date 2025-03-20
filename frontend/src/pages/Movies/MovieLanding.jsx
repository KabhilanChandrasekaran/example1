import { Link } from "react-router-dom";
import BoxReveal from "../../components/BoxReveal";
import BackgroundRipple from "../../components/BackgroundRipple";

const MovieLanding = () => {
  return (
    <div className="relative min-h-screen overflow-hidden font-mono">
      <BackgroundRipple />
      <div className="container mx-auto px-4 py-8 relative z-10 mt-10">
        <BoxReveal>
          <h1 className="text-6xl font-bold mb-6 tracking-widest">
            SkyLights 3D Cinemas
          </h1>
        </BoxReveal>

        <BoxReveal width="100%" boxColor="#96DEAE" duration={0.7}>
          <p className="text-4xl mt-4 text-[#5046e6]">
            Welcome to SkyLight 3D Cinemas seamless booking experience!
          </p>
          <p className="text-2xl mt-4">
            Simply browse through the available showtimes and choose the one that fits your schedule. 
            Our interactive seating chart allows you to select your preferred seats, 
            giving you full control over your booking. Whether you're attending alone or with a group, 
            the process is straightforward and intuitive
          </p>
        </BoxReveal>

        <BoxReveal width="100%" boxColor="#5046e6" duration={0.7}>
          <p className="text-2xl mt-4">
          Once your seats are selected, our system will quickly confirm your booking, providing you with an instant reservation.
            <span className="text-[#5046e6]">
              {" "}
              Fast, Secure, and Convenient
            </span>
            
          </p>
          <Link to="/movieViews">
            <button className="bg-[#2E2E2E] text-white px-4 py-2 rounded-md mt-10 text-2xl">
              Add Booking
            </button>
          </Link>
        </BoxReveal>
      </div>
    </div>
  );
};

export default MovieLanding;
