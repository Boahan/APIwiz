import { JournalEntry } from '../types';

export const exportToCSV = (entries: JournalEntry[]): void => {
  const headers = ['Date', 'Mood', 'Notes', 'Weather Temperature', 'Weather Condition', 'Location'];
  const csvContent = entries.map(entry => [
    entry.date,
    entry.mood,
    `"${entry.notes.replace(/"/g, '""')}"`,
    entry.weather?.temperature || '',
    entry.weather?.condition || '',
    entry.weather?.location || ''
  ].join(','));

  const csv = [headers.join(','), ...csvContent].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `mood-journal-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};