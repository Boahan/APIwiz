import React, { useState } from 'react';
import { JournalEntry, Mood } from '../types';
import { getDaysInMonth, getMonthName } from '../utils/dateUtils';

interface CalendarProps {
  entries: JournalEntry[];
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

const Calendar: React.FC<CalendarProps> = ({ entries, onSelectDate, selectedDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [filterMood, setFilterMood] = useState<Mood | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get mood color for calendar day
  const getMoodColor = (date: string): string => {
    const entry = entries.find(e => e.date === date);
    if (!entry) return '';
    
    const moodColors = {
      happy: 'bg-yellow-400',
      calm: 'bg-blue-400',
      sad: 'bg-indigo-400',
      angry: 'bg-red-400',
      energetic: 'bg-orange-400'
    };
    
    return moodColors[entry.mood];
  };

  // Filter entries by mood if a filter is selected
  const filteredEntries = filterMood 
    ? entries.filter(entry => entry.mood === filterMood)
    : entries;

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar days
  const calendarDays = [];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-10"></div>);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = date === selectedDate;
    const hasEntry = entries.some(entry => entry.date === date);
    const moodColor = getMoodColor(date);
    const isFiltered = filterMood ? moodColor.includes(filterMood) : true;
    
    calendarDays.push(
      <div 
        key={date} 
        className={`
          h-10 flex items-center justify-center relative cursor-pointer
          ${isToday ? 'ring-2 ring-blue-500 font-bold' : ''}
          ${hasEntry && isFiltered ? 'opacity-100' : 'opacity-50'}
          hover:bg-gray-100 rounded-full transition-all duration-200
        `}
        onClick={() => onSelectDate(date)}
      >
        {day}
        {hasEntry && (
          <span className={`absolute bottom-1 w-4 h-1 rounded-full ${moodColor}`}></span>
        )}
      </div>
    );
  }

  const moods = [
    { value: 'happy', label: 'Happy', color: 'bg-yellow-400' },
    { value: 'calm', label: 'Calm', color: 'bg-blue-400' },
    { value: 'sad', label: 'Sad', color: 'bg-indigo-400' },
    { value: 'angry', label: 'Angry', color: 'bg-red-400' },
    { value: 'energetic', label: 'Energetic', color: 'bg-orange-400' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Journal Calendar</h2>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Previous month"
          >
            ←
          </button>
          <span className="font-medium">
            {getMonthName(currentMonth)} {currentYear}
          </span>
          <button 
            onClick={nextMonth}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Filter by mood:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterMood(null)}
            className={`text-xs px-3 py-1 rounded-full border ${!filterMood ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
          >
            All
          </button>
          {moods.map(mood => (
            <button
              key={mood.value}
              onClick={() => setFilterMood(mood.value as Mood)}
              className={`text-xs px-3 py-1 rounded-full border ${filterMood === mood.value ? mood.color + ' text-white' : 'border-gray-300'}`}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map(day => (
          <div key={day} className="h-8 flex items-center justify-center font-medium text-gray-500 text-sm">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {filteredEntries.length} entries {filterMood ? `with ${filterMood} mood` : 'total'}
        </p>
      </div>
    </div>
  );
};

export default Calendar;