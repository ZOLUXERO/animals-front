'use client';

import { useState, useEffect } from 'react';
import cityApi from '@/api/city/cityApi';
import { getEnv } from '@/app/actions/getenv/getenv';

export default function CitySearchClient() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [apikey, setApiKey] = useState('');

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        console.log(cityApi.getUri());
        const envkey = await getEnv();
        const response = await cityApi.get('/cities/city', {
          params: { search: query },
          headers: {
            'x-api-key': envkey
          }
        });
        setSuggestions(response.data.sugg || []);
      } catch (error) {
        console.error('Error fetching city suggestions', error);
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

