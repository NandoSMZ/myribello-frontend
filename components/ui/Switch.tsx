import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-5',
    md: 'w-12 h-6',
    lg: 'w-14 h-7',
  };

  const thumbSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const translateClasses = {
    sm: checked ? 'translate-x-5' : 'translate-x-0',
    md: checked ? 'translate-x-6' : 'translate-x-0',
    lg: checked ? 'translate-x-7' : 'translate-x-0',
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer
        ${sizeClasses[size]}
        ${checked 
          ? 'bg-ribello-gold' 
          : 'bg-gray-600'
        }
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:opacity-90'
        }
        focus:outline-none focus:ring-2 focus:ring-ribello-gold focus:ring-offset-2 focus:ring-offset-black
      `}
    >
      <span
        className={`
          inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out
          ${thumbSizeClasses[size]}
          ${translateClasses[size]}
          ${disabled ? 'animate-pulse' : ''}
        `}
      />
    </button>
  );
};
