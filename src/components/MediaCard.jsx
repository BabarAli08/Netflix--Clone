// components/MediaCard.jsx
import React from 'react';

const MediaCard = ({ item, onClick }) => {
  const title = item.name || item.title || "No Title";
  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  return (
    <div
      onClick={() => onClick(item)}
      className="bg-zinc-900 hover:bg-zinc-800 transition-all rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transform hover:scale-105 duration-300 min-w-[160px]"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[260px] sm:h-[300px] md:h-[340px] object-cover"
      />
      <div className="p-3">
        <h2 className="text-sm sm:text-md font-semibold text-white truncate">
          {title}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Rating: {item.vote_average}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
