import hero from "../images/Seeman.jpg";
import { useEffect, useState } from "react";
import BackgroundRipple from "../components/BackgroundRipple"; // Import BackgroundRipple component

const UnderConstruction = () => {
  const [textVisible, setTextVisible] = useState(false);
  

  useEffect(() => {
    // Trigger text reveal after a short delay
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 500); // Delay to enhance the reveal effect

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="relative min-h-screen">
      
      {/* Background Ripple Effect */}
      <BackgroundRipple className="absolute inset-0" />

      {/* Hero Section */}
      <div
        className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white relative"
        style={{
          backgroundImage: `url(${hero})`, // Local image in 'images' folder
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)", // This makes the hero much darker
            zIndex: 1, // Ensures the overlay is below the content
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10">
          <h1
            className={`text-6xl font-bold mb-6 transition-all duration-1000 ease-in-out ${
              textVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Skylite 3D Cinemas
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg bg-primary text-white p-8 md:p-16">
        <h2 className="text-4xl font-semibold mb-4">
          Why Support SkyLights Cinemas?
        </h2>
        <p className="text-lg mb-6">
          SkyLights Cinemas is dedicated to bringing quality entertainment to the community, 
          offering an immersive cinematic experience for all movie lovers. 
          As a key part of the local entertainment scene, our theatre plays a vital role in promoting 
          film culture and providing a space for families and friends to come together.
        </p>
        <h3 className="text-2xl font-semibold mb-3">
          The Importance of Theatre Management
        </h3>
        <p className="text-lg mb-6">
          A well-managed theatre enhances the movie-watching experience by ensuring smooth movie scheduling, 
          comfortable seating, and seamless booking and payment processes. Beyond entertainment, 
          cinemas contribute to cultural enrichment and support the film industry by showcasing diverse movies. 
          At SkyLights Cinemas, we are committed to maintaining high-quality service, making every visit enjoyable.
        </p>
        <h3 className="text-2xl font-semibold mb-3">How You Can Support Us</h3>
        <p className="text-lg">
          You can be part of the SkyLights Cinemas experience by booking tickets in advance, 
          following cinema etiquette, and supporting local and international films. 
          Additionally, providing feedback helps us improve and deliver better entertainment for our audience. 
          Every visit contributes to keeping the magic of cinema alive!
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
