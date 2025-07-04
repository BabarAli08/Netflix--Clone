import React, { useEffect, useState } from 'react';
import MediaCard from '../components/MediaCard.jsx';
import axios from '../axios.js';

const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ur', label: 'Urdu' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' },
];

const LanguageBrowse = () => {
  const [language, setLanguage] = useState('en');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        `/discover/movie?api_key=129891d78ef4327523c24f5a33a087f6&with_original_language=${language}&sort_by=popularity.desc&page=${page}`
      );
      setMovies((prev) => [...prev, ...res.data.results]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setMovies([]); // Reset on language change
    setPage(1);
  }, [language]);

  useEffect(() => {
    fetchMovies();
  }, [language, page]);

  const handleCardClick = async (movie) => {
    try {
      const trailerRes = await axios.get(
        `/movie/${movie.id}/videos?api_key=129891d78ef4327523c24f5a33a087f6`
      );
      const trailer = trailerRes.data.results.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );
      setSelectedMovie({
        ...movie,
        trailerKey: trailer?.key || null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 py-20 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Browse by Language</h1>

      <div className="mb-6">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-zinc-800 border border-gray-600 rounded px-4 py-2 text-white"
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MediaCard key={movie.id} item={movie} onClick={handleCardClick} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold"
        >
          Load More
        </button>
      </div>

      {selectedMovie?.trailerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto px-4 py-8">
          <button
            onClick={() => setSelectedMovie(null)}
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-500"
          >
            ✕
          </button>

          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {selectedMovie.title}
            </h2>

            <div className="relative w-full pb-[56.25%] mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${selectedMovie.trailerKey}`}
                className="absolute top-0 left-0 w-full h-full rounded"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageBrowse;
