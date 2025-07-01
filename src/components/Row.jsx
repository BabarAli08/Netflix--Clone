import axios from '../axios.js'
import React, { useEffect, useState } from 'react'

const Row = ({ title, fetchURL, isLargeRow=false }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchURL);
        const results = request?.data?.results;

        setMovies(results || []);
        return results
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [fetchURL]); // Important: add fetchURL to dependencies

  return (
    <div className="text-white mb-8 px-4">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>

      {/* Scrollable Row */}
      <div
        className="flex overflow-x-auto space-x-4 scroll-smooth pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Hide scrollbar for Webkit browsers */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {movies.map((movie, index) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w300/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title || movie.name}
            className={`
              rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer
              ${isLargeRow ? 'h-60' : 'h-40'}
              object-cover min-w-[160px] md:min-w-[200px]
            `}
          />
        ))}
      </div>
    </div>
  )
}

export default Row;
