import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import MovieCard from '../comp/MovieCard';
import SearchBar from '../comp/SearchBar';
import LoadingSpinner from '../comp/LoadingSpinner';
import { fetchPopularMovies, searchMovies } from '../service/tmdbService';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load popular movies on component mount
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPopularMovies();
      setMovies(data.results);
      setSearchQuery('');
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error loading popular movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchMovies(query);
      setMovies(data.results);
      setSearchQuery(query);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    loadPopularMovies();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      <header className="page-header">
        <div className="header-content">
          <div className="logo">
            <Film size={32} />
            <h1>MovieFlix</h1>
          </div>
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
        </div>
      </header>

      <main className="main-content">
        <div className="content-header">
          <h2>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
          </h2>
          <p className="movie-count">
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
          </p>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadPopularMovies} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {!error && movies.length === 0 && (
          <div className="no-results">
            <p>No movies found. Try a different search term.</p>
          </div>
        )}

        {!error && movies.length > 0 && (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage; // Export the component