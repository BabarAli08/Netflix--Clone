import axios from '../axios.js'
import React, { useEffect, useState } from 'react'

const Row = ({ title, fetchURL, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchURL]);

  const handleClick = async (movie) => {
    setSelectedMovie(null);
    setActiveId(movie.id);

    try {
      const trailer = await fetchTrailer(movie.id);
      const movieDetails = await fetchMovieDetails(movie.id);

      setSelectedMovie(movieDetails);
      setTrailerKey(trailer?.key || "");
    } catch (error) {
      console.error("Failed to load trailer/info", error);
    }
  };

  const fetchTrailer = async (movieId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=129891d78ef4327523c24f5a33a087f6`);
    const data = await res.json();
    return data.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
  };

  const fetchMovieDetails = async (movieId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=129891d78ef4327523c24f5a33a087f6&append_to_response=credits`);
    return await res.json();
  };

  return (
    <div className="text-white mb-12 px-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>

      {/* Scrollable Row */}
      <div
        className="flex overflow-x-auto space-x-4 scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-col items-center">
            <img
              onClick={() => handleClick(movie)}
              src={`https://image.tmdb.org/t/p/w300/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.title || movie.name}
              className={`
                rounded-lg transition-transform duration-300 cursor-pointer
                ${activeId === movie.id ? 'scale-110 border-4 border-red-500' : 'hover:scale-105'}
                ${isLargeRow ? 'h-60' : 'h-40'}
                object-cover min-w-[140px] md:min-w-[200px]
              `}
            />
            <p className="text-xs sm:text-sm mt-2 text-center w-[140px] md:w-[200px] truncate">
              {movie.title || movie.name}
            </p>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedMovie && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 p-4 sm:p-8 overflow-y-auto">
          <button
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-500"
            onClick={() => {
              setSelectedMovie(null);
              setActiveId(null);
            }}
          >
            ✕
          </button>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">{selectedMovie.title}</h2>

            {trailerKey ? (
              <div className="w-full aspect-video mb-6">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>
            ) : (
              <p className="mb-6 text-gray-400">No trailer available.</p>
            )}

            <p className="mb-6 text-base sm:text-lg text-gray-200 leading-relaxed">
              {selectedMovie.overview}
            </p>

            {/* Cast Grid */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Top Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedMovie.credits?.cast?.slice(0, 10).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                          : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                      }
                      alt={actor.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-2 border border-gray-600"
                    />
                    <p className="text-sm sm:text-base text-white font-medium">
                      {actor.name}
                    </p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;
