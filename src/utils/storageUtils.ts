import { JournalEntry } from '../types';

const STORAGE_KEY = 'mood-journal-entries';

export const saveEntries = (entries: JournalEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = (): JournalEntry[] => {
  const storedEntries = localStorage.getItem(STORAGE_KEY);
  return storedEntries ? JSON.parse(storedEntries) : [];
};

export const saveEntry = (entry: JournalEntry): void => {
  const entries = getEntries();
  const existingEntryIndex = entries.findIndex(e => e.date === entry.date);
  
  if (existingEntryIndex >= 0) {
    entries[existingEntryIndex] = entry;
  } else {
    entries.push(entry);
  }
  
  saveEntries(entries);
};

export const getEntryByDate = (date: string): JournalEntry | undefined => {
  const entries = getEntries();
  return entries.find(entry => entry.date === date);
};

export const deleteEntry = (id: string): void => {
  const entries = getEntries();
  const filteredEntries = entries.filter(entry => entry.id !== id);
  saveEntries(filteredEntries);
};