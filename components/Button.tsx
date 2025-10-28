
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-bold transition duration-200 ease-in-out shadow-lg text-sm';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 hover:bg-blue-700 text-white';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-600 hover:bg-gray-700 text-white';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
