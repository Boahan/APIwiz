import { useState, useEffect } from 'react';
import { GeolocationPosition, WeatherData } from '../types';
import { fetchWeatherData } from '../utils/weatherApi';

export const useWeather = (position: GeolocationPosition | null) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      if (!position) {
        setError('Location access is required to fetch weather data. Please enable location services.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(position);
        setWeatherData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
        setError(errorMessage);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [position]);

  return { weatherData, loading, error };
};