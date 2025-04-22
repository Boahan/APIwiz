import { useState, useEffect } from 'react';
import { JournalEntry, Mood, WeatherData } from '../types';
import { getEntries, saveEntry, deleteEntry } from '../utils/storageUtils';
import { formatCalendarDate } from '../utils/dateUtils';

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(formatCalendarDate(new Date()));
  
  useEffect(() => {
    const storedEntries = getEntries();
    setEntries(storedEntries);
  }, []);

  const addEntry = (mood: Mood, notes: string, weatherData: WeatherData | null): void => {
    const newEntry: JournalEntry = {
      id: `${selectedDate}-${Date.now()}`,
      date: selectedDate,
      mood,
      notes,
      weather: weatherData
    };
    
    saveEntry(newEntry);
    setEntries(prevEntries => {
      const existingEntryIndex = prevEntries.findIndex(e => e.date === selectedDate);
      
      if (existingEntryIndex >= 0) {
        const updatedEntries = [...prevEntries];
        updatedEntries[existingEntryIndex] = newEntry;
        return updatedEntries;
      }
      
      return [...prevEntries, newEntry];
    });
  };

  const removeEntry = (id: string): void => {
    deleteEntry(id);
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const getEntryForSelectedDate = (): JournalEntry | undefined => {
    return entries.find(entry => entry.date === selectedDate);
  };

  const getEntriesByMood = (mood: Mood | null): JournalEntry[] => {
    if (!mood) return entries;
    return entries.filter(entry => entry.mood === mood);
  };

  return {
    entries,
    selectedDate,
    setSelectedDate,
    addEntry,
    removeEntry,
    getEntryForSelectedDate,
    getEntriesByMood
  };
};