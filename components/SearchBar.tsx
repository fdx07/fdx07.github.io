import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-10 bg-background-800 border border-brand-secondary text-brand-text rounded-lg focus:ring-2 focus:ring-brand-core focus:border-brand-core outline-none transition-colors placeholder-brand-text placeholder-opacity-50" // bg-white, border-dark-blue, text-navy, placeholder-navy placeholder-opacity-50
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-brand-text opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> {/* text-navy opacity-50 (was text-gray-400) */}
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;