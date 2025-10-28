
import React from 'react';
import { CellValue } from '../types';

interface CellProps {
  type: CellValue;
}

const Cell: React.FC<CellProps> = React.memo(({ type }) => (
  <div
    className={`w-6 h-6 sm:w-8 sm:h-8 border border-gray-700 ${type[0]} relative
      ${type[0] !== 'bg-gray-800' ? 'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]' : ''}
    `}
  >
    {/* Optional: Add inner highlights for a more 3D look */}
    {type[0] !== 'bg-gray-800' && (
      <>
        <div className="absolute inset-px rounded-sm opacity-20 bg-white" />
        <div className="absolute inset-px rounded-sm opacity-20 bg-gray-900" />
      </>
    )}
  </div>
));

export default Cell;
