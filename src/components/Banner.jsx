import React, { useEffect, useState } from 'react';
import axios from '../axios.js';
import requests from '../Request.js';
const Banner = () => {

  const [movie, setMovie] = useState([])


  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

        const results = request?.data?.results;

        if (Array.isArray(results) && results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          setMovie(results[randomIndex]);
        } else {
          console.warn("No results found in response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string ? string.length > n ? string.substr(0, n - 1) + "..." : string : ""
  }
  return (
    <header
      className="relative text-white h-[80vh] md:h-[90vh] flex items-center px-8 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
      }}
    >
      {/* Light black overlay across the full background */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Top to Transparent Gradient for style */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">{movie?.name}</h1>
        <p className="text-sm md:text-base font-light max-w-md line-clamp-3">
          {truncate(movie?.overview, 180)}
        </p>
        <div className="space-x-4">
          <button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-300 transition">
            ▶ Play
          </button>
          <button className="bg-gray-700 bg-opacity-70 text-white px-6 py-2 font-semibold rounded hover:bg-gray-600 transition">
            + My List
          </button>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10" />
    </header>
  );
};

export default Banner;
