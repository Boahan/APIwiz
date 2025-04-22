import React from 'react';
import { Mood } from '../types';

interface MoodOption {
  value: Mood;
  emoji: string;
  label: string;
  color: string;
}

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  const moods: MoodOption[] = [
    { value: 'happy', emoji: '😊', label: 'Happy', color: 'bg-yellow-400' },
    { value: 'calm', emoji: '😌', label: 'Calm', color: 'bg-blue-400' },
    { value: 'sad', emoji: '😔', label: 'Sad', color: 'bg-indigo-400' },
    { value: 'angry', emoji: '😠', label: 'Angry', color: 'bg-red-400' },
    { value: 'energetic', emoji: '⚡', label: 'Energetic', color: 'bg-orange-400' }
  ];

  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mb-3 text-gray-700">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelectMood(mood.value)}
            className={`
              ${mood.color} hover:opacity-90 transition-all duration-200
              rounded-full flex flex-col items-center justify-center p-4 w-20 h-20
              transform hover:scale-105 ${selectedMood === mood.value ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : ''}
            `}
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="text-3xl mb-1">{mood.emoji}</span>
            <span className="text-sm font-medium text-white">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;