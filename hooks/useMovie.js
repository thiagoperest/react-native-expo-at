import { useState, useEffect, useRef } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const LIMIT = 20;

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryRef = useRef('');
  searchQueryRef.current = searchQuery;

  const fetchMovies = async (pageNum, query, append) => {
    if (!append) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const endpoint = query
        ? `${BASE_URL}/photos?title_like=${encodeURIComponent(
            query
          )}&_page=${pageNum}&_limit=${LIMIT}`
        : `${BASE_URL}/photos?_page=${pageNum}&_limit=${LIMIT}`;

      const response = await fetch(endpoint);
      const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
      const data = await response.json();

      if (total > 0) {
        setTotalPages(Math.ceil(total / LIMIT));
      }

      if (append) {
        setMovies((prev) => [...prev, ...data]);
      } else {
        setMovies(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const delay = searchQuery ? 400 : 0;
    const timer = setTimeout(() => {
      fetchMovies(1, searchQuery, false);
    }, delay);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page, searchQueryRef.current, true);
    }
  }, [page]);

  const handleSetSearchQuery = (text) => {
    setSearchQuery(text);
    setPage(1);
  };

  const loadMore = () => {
    if (!loadingMore && !loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    movies,
    loading,
    loadingMore,
    error,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    loadMore,
  };
}
