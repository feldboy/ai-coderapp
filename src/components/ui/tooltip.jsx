import React, { useState } from 'react';

export function Tooltip({ children, delayDuration = 300 }) {
  return (
    <div className="relative inline-block">
      {children}
    </div>
  );
}

export function TooltipTrigger({ children, asChild, ...props }) {
  return (
    <div className="inline-block" {...props}>
      {children}
    </div>
  );
}

export function TooltipContent({ children, className = '', ...props }) {
  return (
    <div
      className={`z-50 overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function TooltipProvider({ children }) {
  return children;
}