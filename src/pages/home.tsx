import { useState } from "react";
import EnrollForm from "../components/EnrollForm";

const Home = () => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1479839672679-a46483c0e7c8')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/*  Top Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4">
        <h2 className="text-white font-bold text-xl tracking-wide">
          RealEstate
        </h2>

        <button
          onClick={() => setOpenForm(true)}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 
                     rounded-full text-white font-semibold 
                     transition shadow-lg focus:ring-2 focus:ring-emerald-300"
        >
          Enroll Now
        </button>
      </div>

      {/*  Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-72px)] px-4">
        <div className="max-w-2xl text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
            Find Your <span className="text-emerald-400">Perfect Home</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 mb-8">
            Discover premium apartments, verified projects, and exclusive
            property deals tailored just for you.
          </p>

          <button
            onClick={() => setOpenForm(true)}
            className="px-10 py-4 bg-white text-slate-900 
                       rounded-full text-lg font-bold
                       hover:bg-slate-100 transition shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Modal */}
      {openForm && <EnrollForm onClose={() => setOpenForm(false)} />}
    </div>
  );
};

export default Home;
