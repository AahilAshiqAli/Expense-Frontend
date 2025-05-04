import { useState } from 'react';
interface SuggestionsBoxProps {
  onAddCategories?: (category: string) => void;
  suggestions: string[];
}

export default function SuggestionsBox({ onAddCategories, suggestions }: SuggestionsBoxProps) {
  // const [suggestions] = useState<string[]>([
  //   'Utilities',
  //   'Dining Out',
  //   'Entertainment',
  //   'Transportation',
  //   'Healthcare',
  // ]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<string>('');
  const toggleSuggestion = (suggestion: string): void => {
    setSelectedSuggestions(suggestion);
    if (onAddCategories && suggestion) {
      onAddCategories(suggestion);
    }
  };

  return (
    <div className="mb-6 mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">Suggested Categories</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => toggleSuggestion(suggestion)}
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              selectedSuggestions.includes(suggestion)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* {selectedSuggestions.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleAddSelected}
            className="rounded-md bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600"
          >
            Add Selected Categories
          </button>
        </div>
      )} */}
    </div>
  );
}
