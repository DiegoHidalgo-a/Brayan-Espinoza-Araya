import React from 'react';

interface BackgroundPatternProps {
  type?: 'dots' | 'lines' | 'grid' | 'waves';
  className?: string;
  opacity?: number;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ 
  type = 'dots', 
  className = '', 
  opacity = 0.05 
}) => {
  const patterns = {
    dots: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    lines: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity }}>
        <defs>
          <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines)" />
      </svg>
    ),
    grid: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity }}>
        <defs>
          <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    waves: (
      <svg className={`absolute inset-0 w-full h-full ${className}`} style={{ opacity }}>
        <defs>
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 Q 25 0 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
    )
  };

  return patterns[type];
};

export default BackgroundPattern;

