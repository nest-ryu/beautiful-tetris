
import React from 'react';
import Button from './Button';

interface HowToPlayModalProps {
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-4 border-gray-700 rounded-lg p-8 max-w-lg w-full shadow-2xl relative">
        <h2 className="font-['Press_Start_2P'] text-3xl text-green-400 mb-6 text-center">HOW TO PLAY</h2>

        <div className="space-y-4 text-gray-200">
          <p>
            <strong className="font-['Press_Start_2P'] text-yellow-400">Left Arrow:</strong> Move piece left
          </p>
          <p>
            <strong className="font-['Press_Start_2P'] text-yellow-400">Right Arrow:</strong> Move piece right
          </p>
          <p>
            <strong className="font-['Press_Start_2P'] text-yellow-400">Down Arrow:</strong> Rotate piece clockwise
          </p>
          <p>
            <strong className="font-['Press_Start_2P'] text-yellow-400">Spacebar:</strong> Hard drop (instantly drop to bottom)
          </p>
          <p>
            <strong className="font-['Press_Start_2P'] text-yellow-400">P:</strong> Pause/Unpause game
          </p>
          <p className="text-sm italic text-gray-400 mt-6">
            Clear lines to score points and level up. As you level up, the game speed increases! You have 3 lives.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={onClose}>
            GOT IT!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;