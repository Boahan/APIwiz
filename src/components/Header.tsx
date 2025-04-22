import React from 'react';
import { formatDate } from '../utils/dateUtils';
import { CloudSun } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <CloudSun size={32} className="mr-2" />
          <h1 className="text-2xl font-bold">Mood Journal</h1>
        </div>
        <div className="text-xl font-medium">
          {formatDate(new Date())}
        </div>
      </div>
    </header>
  );
};

export default Header;