import React from 'react';
import { WeatherData } from '../types';
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <p className="text-red-500">
          {error || 'Unable to fetch weather data. Please enable location services.'}
        </p>
      </div>
    );
  }

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('clear')) return <Sun className="text-yellow-500" size={36} />;
    if (lowerCondition.includes('rain')) return <CloudRain className="text-blue-500" size={36} />;
    if (lowerCondition.includes('snow')) return <CloudSnow className="text-blue-200" size={36} />;
    if (lowerCondition.includes('cloud')) return <Cloud className="text-gray-500" size={36} />;
    return <Wind className="text-gray-400" size={36} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{weatherData.location}</h3>
          <p className="text-gray-600">{weatherData.condition}</p>
        </div>
        <div className="flex items-center">
          {getWeatherIcon(weatherData.condition)}
        </div>
      </div>
      
      <div className="text-3xl font-bold text-gray-800 mb-4">
        {weatherData.temperature}°C
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Humidity:</span> {weatherData.humidity}%
        </div>
        <div>
          <span className="font-medium">Wind:</span> {weatherData.windSpeed} m/s
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;