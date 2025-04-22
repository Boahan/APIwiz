import React from 'react';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import WeatherDisplay from './components/WeatherDisplay';
import JournalForm from './components/JournalForm';
import Calendar from './components/Calendar';
import EntryList from './components/EntryList';
import MoodTrends from './components/MoodTrends';
import { useGeolocation } from './hooks/useGeolocation';
import { useWeather } from './hooks/useWeather';
import { useJournal } from './hooks/useJournal';
import { useDarkMode } from './hooks/useDarkMode';
import { formatCalendarDate } from './utils/dateUtils';
import { exportToCSV } from './utils/exportUtils';
import { Mood } from './types';
import { Download, Moon, Sun } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const { position, error: geoError } = useGeolocation();
  const { weatherData, loading: weatherLoading, error: weatherError } = useWeather(position);
  const { 
    entries, 
    selectedDate, 
    setSelectedDate, 
    addEntry, 
    removeEntry, 
    getEntryForSelectedDate,
    getEntriesByMood
  } = useJournal();

  const currentEntry = getEntryForSelectedDate();
  const isToday = selectedDate === formatCalendarDate(new Date());

  const handleSaveEntry = (mood: Mood, notes: string) => {
    addEntry(mood, notes, weatherData);
  };

  const handleExport = () => {
    exportToCSV(entries);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}>
      <Header isDark={isDark} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-600" />}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download size={18} />
            Export to CSV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Weather and Journal Form */}
          <div className="lg:col-span-2 space-y-6">
            {isToday && (
              <div className="mb-6">
                <WeatherDisplay 
                  weatherData={weatherData} 
                  loading={weatherLoading} 
                  error={weatherError || geoError}
                  isDark={isDark}
                />
              </div>
            )}
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {isToday ? 'Today\'s Journal' : 'Edit Past Entry'}
              </h2>
              <JournalForm 
                onSave={handleSaveEntry}
                currentEntry={currentEntry}
                weatherData={isToday ? weatherData : null}
                isDark={isDark}
              />
            </div>

            <MoodTrends entries={entries} isDark={isDark} />
          </div>
          
          {/* Right column - Calendar and Entry List */}
          <div className="space-y-6">
            <Calendar 
              entries={entries}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              isDark={isDark}
            />
            
            <EntryList 
              entries={getEntriesByMood(null)}
              onSelectEntry={setSelectedDate}
              onDeleteEntry={removeEntry}
              isDark={isDark}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;