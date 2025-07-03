import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, removeFromList } from '../app/features/counter/UserList';

const MediaCard = ({ item, onClick }) => {

  const title = item.name || item.title || "No Title";
  const imageUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  const dispatch = useDispatch();
  const list = useSelector(state => state.userList.list);
  const isFavorited = list.some(fav => fav.id === item.id);
  const [clicked, setClicked] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setClicked(true);
    if (isFavorited) {
      dispatch(removeFromList(item.id))
    } else {

      dispatch(addToList({
        id: item.id,
        title: item.title || item.name,
        vote_average: item.vote_average,
        poster_path: item.poster_path,
      }));
    }
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div
      onClick={() => onClick(item)}
      className="relative bg-zinc-900 hover:bg-zinc-800 transition-all rounded-lg overflow-hidden shadow-md hover:shadow-xl cursor-pointer transform hover:scale-105 duration-300"
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[360px] object-cover"
      />

      {/* Heart Icon */}
      <div
        onClick={handleHeartClick}
        className={`absolute top-2 right-2 p-1 rounded-full bg-black/70 z-10 ${clicked ? 'animate-pulse' : ''
          }`}
      >
        {isFavorited ? (
          <FaHeart className="text-red-500" size={18} />
        ) : (
          <FaRegHeart className="text-white" size={18} />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h2 className="text-md font-semibold text-white truncate">{title}</h2>
        <p className="text-xs text-gray-400 mt-1">Rating: {item.vote_average}</p>
      </div>
    </div>
  );
};

export default MediaCard;
