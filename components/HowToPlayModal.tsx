
import React from 'react';
import Button from './Button';

interface HowToPlayModalProps {
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-4 border-gray-700 rounded-xl p-8 max-w-lg w-full shadow-2xl relative">
        <h2 className="font-['Press_Start_2P'] text-3xl text-green-400 mb-6 text-center">HOW TO PLAY</h2>

        <div className="space-y-4 text-gray-200">
          <div className="bg-gray-900 p-3 rounded-lg">
            <strong className="font-['Press_Start_2P'] text-yellow-400">←→ LEFT/RIGHT:</strong> Move piece
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <strong className="font-['Press_Start_2P'] text-yellow-400">↓ DOWN:</strong> Rotate piece
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <strong className="font-['Press_Start_2P'] text-yellow-400">SPACE:</strong> Hard drop
          </div>
          <div className="bg-gray-900 p-3 rounded-lg">
            <strong className="font-['Press_Start_2P'] text-yellow-400">P:</strong> Pause game
          </div>
          <p className="text-sm text-gray-400 mt-6 p-3 bg-blue-900/50 rounded-lg">
            🎯 Clear lines to score points! Level up to increase speed!
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={onClose}>
            GOT IT!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;