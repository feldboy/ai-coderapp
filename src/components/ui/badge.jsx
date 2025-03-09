import React from 'react';

export function Badge({ children, variant = 'default', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold';
  
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'text-gray-600 border border-gray-200'
  };
  
  const variantStyle = variants[variant] || variants.default;
  
  return (
    <div
      className={`${baseStyles} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}