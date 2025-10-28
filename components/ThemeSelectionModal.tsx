
import React from 'react';
import Button from './Button';
import { THEMES } from '../constants';
import { Theme } from '../types';

interface ThemeSelectionModalProps {
  onClose: () => void;
  onSelectTheme: (theme: Theme) => void;
  selectedThemeId: string;
}

const ThemeSelectionModal: React.FC<ThemeSelectionModalProps> = ({ onClose, onSelectTheme, selectedThemeId }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-4 border-gray-700 rounded-lg p-8 max-w-lg w-full shadow-2xl relative">
        <h2 className="font-['Press_Start_2P'] text-3xl text-yellow-400 mb-6 text-center">SELECT THEME</h2>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              className={`w-full flex items-center p-3 rounded-md transition duration-200 ease-in-out
                ${theme.uiBgClass} ${theme.uiBorderClass} border-2
                ${selectedThemeId === theme.id ? 'ring-4 ring-yellow-400' : 'hover:ring-2 hover:ring-gray-500'}
              `}
              onClick={() => {
                onSelectTheme(theme);
              }}
            >
              <div
                className={`w-8 h-8 rounded-full mr-4 ${theme.emptyCellClass} border border-gray-500`}
              />
              <span className="font-['Press_Start_2P'] text-lg text-gray-200">{theme.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={onClose}>
            CLOSE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelectionModal;