import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { getImageUrl } from '../service/tmdbService';

const MovieCard = ({ movie }) => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    overview
  } = movie;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating) => {
    return Math.round(rating * 10) / 10;
  };

  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="movie-poster-container">
        <img
          src={getImageUrl(poster_path)}
          alt={title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
          }}
        />
        <div className="movie-overlay">
          <p className="movie-overview">{overview}</p>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          <div className="movie-rating">
            <Star className="star-icon" size={16} />
            <span>{formatRating(vote_average)}</span>
          </div>
          <div className="movie-year">
            <Calendar className="calendar-icon" size={16} />
            <span>{formatDate(release_date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; // Export the component
