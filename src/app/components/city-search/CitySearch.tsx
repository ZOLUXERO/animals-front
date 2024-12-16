'use client';

import { useState, useEffect } from 'react';
import { searchCities } from '@/app/actions/city-search/citySearch';

export default function CitySearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await searchCities(query);
        console.log(results);
        setSuggestions(results);
      } catch (error) {
        console.error('No funcaaaaaaaaa!!!!!!!!', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search cities..."
        className="w-full p-2 border rounded"
      />
      {loading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full border rounded mt-1 bg-white">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(city);
                setSuggestions([]);
              }}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
