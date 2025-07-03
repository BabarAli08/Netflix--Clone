import React, { useEffect, useState } from 'react';
import axios from '../axios.js';
import Navbar from '../components/Navbar.jsx';
import MediaCard from '../components/MediaCard.jsx';

const Shows = ({ title, fetchURL }) => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get(`${fetchURL}&page=${page}`);
        setShows(prev => [...prev, ...req.data.results]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [fetchURL, page]);

  const fetchTrailers = async (tvId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=129891d78ef4327523c24f5a33a087f6`
    );
    const data = await res.json();

    if (!data?.results || !Array.isArray(data.results)) {
      return null;
    }

    return data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    ) || null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};


 const fetchCredits = async (tvId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvId}?api_key=129891d78ef4327523c24f5a33a087f6&append_to_response=credits`
    );
    const data = await res.json();

    if (data?.credits?.cast && Array.isArray(data.credits.cast)) {
      return data.credits.cast;
    } else {
      console.warn(`No cast info for TV show with ID ${tvId}`);
      return []; // Fallback: return empty cast
    }
  } catch (err) {
    console.error("Error fetching credits:", err);
    return []; // Fallback: return empty cast
  }
};


  const handleClick = async (show) => {
    const trailer = await fetchTrailers(show.id);
    const credits = await fetchCredits(show.id);

    setSelectedShow({
      ...show,
      trailerKey: trailer?.key || null,
      cast: credits
    });
  };

  return (
    <>
      <div className="px-4 py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
          {title}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {shows.map((show, i) => (
            <MediaCard key={i} item={show} onClick={handleClick} />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-all duration-200"
          >
            Load More
          </button>
        </div>
      </div>

      {selectedShow?.id && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto px-4 py-8 sm:px-6 sm:py-10">
          <button
            onClick={() => setSelectedShow(null)}
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-500 transition-all"
          >
            ✕
          </button>

          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
              {selectedShow.name || selectedShow.title}
            </h2>

            {/* Responsive YouTube embed */}
            <div className="relative w-full pb-[56.25%] mb-6">
              <iframe
                src={`https://www.youtube.com/embed/${selectedShow.trailerKey}`}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <h3 className="text-lg sm:text-xl text-white font-semibold mb-3">Top Cast</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedShow.cast?.slice(0, 8).map((actor) => (
                <div key={actor.id} className="text-white text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                    }
                    alt={actor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-2"
                  />
                  <p className="text-sm">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shows;
