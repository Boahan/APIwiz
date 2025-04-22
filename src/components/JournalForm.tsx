import React, { useState, useEffect } from 'react';
import { Mood, WeatherData } from '../types';
import MoodSelector from './MoodSelector';

interface JournalFormProps {
  onSave: (mood: Mood, notes: string) => void;
  currentEntry: {
    mood: Mood | null;
    notes: string;
  } | undefined;
  weatherData: WeatherData | null;
}

const JournalForm: React.FC<JournalFormProps> = ({ onSave, currentEntry, weatherData }) => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (currentEntry) {
      setMood(currentEntry.mood);
      setNotes(currentEntry.notes);
    } else {
      setMood(null);
      setNotes('');
    }
  }, [currentEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mood) {
      alert('Please select a mood before saving');
      return;
    }
    
    onSave(mood, notes);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Determine background gradient based on mood
  const getBgGradient = () => {
    if (!mood) return 'bg-white';
    
    const gradients = {
      happy: 'bg-gradient-to-r from-yellow-100 to-yellow-200',
      calm: 'bg-gradient-to-r from-blue-100 to-blue-200',
      sad: 'bg-gradient-to-r from-indigo-100 to-indigo-200',
      angry: 'bg-gradient-to-r from-red-100 to-red-200',
      energetic: 'bg-gradient-to-r from-orange-100 to-orange-200'
    };
    
    return gradients[mood];
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`rounded-lg shadow-md p-6 transition-all duration-500 ${getBgGradient()}`}
    >
      <div className="mb-6">
        <MoodSelector 
          selectedMood={mood} 
          onSelectMood={(newMood) => setMood(newMood)} 
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="notes" className="block text-lg font-medium mb-2 text-gray-700">
          Journal Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write about your day..."
          className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      {weatherData && (
        <div className="mb-6 p-3 bg-white bg-opacity-70 rounded-md">
          <p className="text-sm text-gray-600">
            Your entry will include today's weather: {weatherData.temperature}°C, {weatherData.condition} in {weatherData.location}
          </p>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors duration-200"
          disabled={!mood}
        >
          Save Entry
        </button>
      </div>
      
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md transition-opacity duration-500">
          <p>Journal entry saved successfully!</p>
        </div>
      )}
    </form>
  );
};

export default JournalForm;