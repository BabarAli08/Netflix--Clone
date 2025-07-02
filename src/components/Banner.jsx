import React, { useEffect, useState } from 'react';
import axios from '../axios.js';
import requests from '../Request.js';

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request?.data?.results;

        if (Array.isArray(results) && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          setMovie(results[randomIndex]);
        } else {
          console.warn("No results found.");
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string || "";
  };

  return (
    <header
      className="relative text-white h-[80vh] md:h-[90vh] flex items-center px-4 md:px-8 bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Top gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-2xl space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="text-sm md:text-base font-light max-w-md md:max-w-lg line-clamp-3">
          {truncate(movie?.overview, 180)}
        </p>

        <div className="flex flex-wrap gap-3">
          <button className="bg-white text-black px-6 py-2 md:px-8 md:py-2.5 font-semibold rounded hover:bg-gray-200 transition duration-300 text-sm md:text-base">
            ▶ Play
          </button>
          <button className="bg-gray-700 bg-opacity-80 text-white px-6 py-2 md:px-8 md:py-2.5 font-semibold rounded hover:bg-gray-600 transition duration-300 text-sm md:text-base">
            + My List
          </button>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </header>
  );
};

export default Banner;
