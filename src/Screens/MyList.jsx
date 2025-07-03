import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { removeFromList } from '../app/features/counter/UserList';

const MyList = () => {
  const list = useSelector((state) => state.userList.list);
  const dispatch = useDispatch();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');

  const handleClick = async (movie) => {
    try {
      if (!movie?.id) return;

      const trailer = await fetchTrailer(movie.id);
      const details = await fetchDetails(movie.id);
      setTrailerKey(trailer?.key || '');
      setSelectedMovie(details);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  const fetchTrailer = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=129891d78ef4327523c24f5a33a087f6`
    );
    const data = await res.json();
    return (
      data.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube') ||
      data.results.find((vid) => vid.type === 'Teaser' && vid.site === 'YouTube')
    );
  };

  const fetchDetails = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=129891d78ef4327523c24f5a33a087f6&append_to_response=credits`
    );
    return res.json();
  };

  return (
    <>
      <div className="px-4 py-20 text-white min-h-screen bg-black">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">My List</h1>

        {list.length === 0 ? (
          <p className="text-gray-400 text-center text-lg mt-20">
            Your list is empty. Start adding your favorite shows and movies!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {list.map((item) => {
              const title = item.title || item.name || 'Untitled';
              const imageUrl = item.poster_path
                ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
                : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

              return (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className="relative bg-zinc-900 rounded-lg shadow hover:shadow-xl transition-all group cursor-pointer"
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-[340px] object-cover rounded-t-lg"
                  />

                  <div className="p-3">
                    <h2 className="text-md font-semibold truncate">{title}</h2>
                    <p className="text-xs text-gray-400 mt-1">Rating: {item.vote_average || 'N/A'}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromList(item.id));
                    }}
                    className="absolute top-2 right-2 text-white bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash className="text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedMovie && selectedMovie.id && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 p-4 sm:p-8 overflow-y-auto">
          <button
            className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-500"
            onClick={() => {
              setSelectedMovie(null);
              setTrailerKey('');
            }}
          >
            ✕
          </button>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              {selectedMovie.title || selectedMovie.name}
            </h2>

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
              {selectedMovie.overview || 'No overview available.'}
            </p>

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Top Cast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedMovie.credits?.cast?.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center text-center">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                          : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                      }
                      alt={actor.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-2 border border-gray-600"
                    />
                    <p className="text-sm sm:text-base text-white font-medium">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyList;
