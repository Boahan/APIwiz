import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { JournalEntry, Mood } from '../types';

interface MoodTrendsProps {
  entries: JournalEntry[];
  isDark: boolean;
}

const MoodTrends: React.FC<MoodTrendsProps> = ({ entries, isDark }) => {
  const moodColors = {
    happy: '#FBBF24',
    calm: '#60A5FA',
    sad: '#818CF8',
    angry: '#F87171',
    energetic: '#FB923C'
  };

  const weeklyData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayEntries = entries.filter(entry => entry.date === date);
      const moodCounts: Record<Mood, number> = {
        happy: 0,
        calm: 0,
        sad: 0,
        angry: 0,
        energetic: 0
      };

      dayEntries.forEach(entry => {
        moodCounts[entry.mood]++;
      });

      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        ...moodCounts
      };
    });
  }, [entries]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Weekly Mood Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <XAxis 
              dataKey="date" 
              stroke={isDark ? '#9CA3AF' : '#4B5563'}
            />
            <YAxis 
              stroke={isDark ? '#9CA3AF' : '#4B5563'}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '0.5rem',
                color: isDark ? '#FFFFFF' : '#000000'
              }}
            />
            {Object.entries(moodColors).map(([mood, color]) => (
              <Bar 
                key={mood} 
                dataKey={mood} 
                fill={color} 
                stackId="stack"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodTrends;