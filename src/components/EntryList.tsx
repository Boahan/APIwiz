import React from 'react';
import { JournalEntry } from '../types';

interface EntryListProps {
  entries: JournalEntry[];
  onSelectEntry: (date: string) => void;
  onDeleteEntry: (id: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onSelectEntry, onDeleteEntry }) => {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No journal entries yet. Create your first entry!</p>
      </div>
    );
  }

  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get mood emoji
  const getMoodEmoji = (mood: string): string => {
    const emojis: Record<string, string> = {
      happy: '😊',
      calm: '😌',
      sad: '😔',
      angry: '😠',
      energetic: '⚡'
    };
    
    return emojis[mood] || '😐';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Entries</h2>
      <div className="space-y-3">
        {sortedEntries.slice(0, 5).map((entry) => (
          <div 
            key={entry.id} 
            className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => onSelectEntry(entry.date)}
              >
                <span className="text-2xl mr-2">{getMoodEmoji(entry.mood)}</span>
                <div>
                  <div className="font-medium">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  {entry.weather && (
                    <div className="text-xs text-gray-500">
                      {entry.weather.temperature}°C, {entry.weather.condition}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => onDeleteEntry(entry.id)}
                className="text-red-500 hover:text-red-700 text-sm"
                aria-label="Delete entry"
              >
                Delete
              </button>
            </div>
            
            {entry.notes && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {entry.notes}
              </p>
            )}
          </div>
        ))}
      </div>
      
      {entries.length > 5 && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">
            + {entries.length - 5} more entries
          </p>
        </div>
      )}
    </div>
  );
};

export default EntryList;