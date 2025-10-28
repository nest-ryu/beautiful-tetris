
import React from 'react';
import { CellValue } from '../types';

interface CellProps {
  type: CellValue;
}

const Cell: React.FC<CellProps> = React.memo(({ type }) => (
  <div
    className={`w-6 h-6 sm:w-8 sm:h-8 ${type[0]} relative
      ${type[0] !== 'bg-gray-800' ? 'shadow-inner' : ''}
      transition-all duration-100
    `}
  >
    {/* 3D effect for placed blocks */}
    {type[0] !== 'bg-gray-800' && (
      <>
        <div className="absolute inset-0 opacity-30 bg-white" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 35%, 0% 35%)' }} />
        <div className="absolute inset-0 opacity-20 bg-black" style={{ clipPath: 'polygon(0% 65%, 100% 65%, 100% 100%, 0% 100%)' }} />
      </>
    )}
  </div>
));

export default Cell;
