export type Mood = 'happy' | 'calm' | 'sad' | 'angry' | 'energetic';

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  location: string;
  humidity: number;
  windSpeed: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: Mood;
  notes: string;
  weather: WeatherData | null;
}

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
}