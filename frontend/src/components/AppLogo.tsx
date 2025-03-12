import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  size = 'md', 
  showText = true 
}) => {
  // Configurar tamaños
  const sizes = {
    sm: { logo: 32, text: 'text-sm' },
    md: { logo: 40, text: 'text-base' },
    lg: { logo: 48, text: 'text-lg' },
  };
  
  const { logo, text } = sizes[size];
  
  return (
    <div className="flex items-center">
      <div className="relative">
        {/* Marco decorativo */}
        <div className={`w-${logo / 8} h-${logo / 8} absolute -top-1 -left-1 border border-amber-800/40 rounded-sm transform rotate-3`}></div>
        
        {/* Logo SVG */}
        <svg 
          width={logo} 
          height={logo} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <rect width="100" height="100" rx="8" fill="#1E1710"/>
          <rect x="5" y="5" width="90" height="90" rx="5" stroke="#BE8730" strokeOpacity="0.5" strokeWidth="1.5"/>
          <rect x="8" y="8" width="84" height="84" rx="3" stroke="#7C3030" strokeOpacity="0.3" strokeWidth="1"/>
          <path d="M75 35C75 26.7157 68.2843 20 60 20H40C31.7157 20 25 26.7157 25 35V50C25 58.2843 31.7157 65 40 65H45L50 75L55 65H60C68.2843 65 75 58.2843 75 50V35Z" fill="#481D1D" stroke="#BE8730" strokeWidth="2"/>
          <g transform="translate(50 42.5) rotate(-5)">
            <path d="M-15 -5 C -15 -12 -10 -17.5 -3 -17.5 L 3 -17.5 C 10 -17.5 15 -12 15 -5 L 15 5 C 15 12 10 17.5 3 17.5 L -3 17.5 C -10 17.5 -15 12 -15 5 Z" 
                fill="none" stroke="#D6AD7B" strokeWidth="2.5"/>
            <path d="M-5 -10 L -5 10 L 0 10 C 6 10 10 5 10 0 C 10 -5 6 -10 0 -10 Z" 
                fill="#BF8C4C" fillOpacity="0.6"/>
          </g>
          <path d="M65 15L60 35L68 45L65 55L72 70L65 85" stroke="#7C3030" strokeWidth="1" strokeOpacity="0.7"/>
          <circle cx="32" cy="38" r="2" fill="#D6AD7B" fillOpacity="0.8"/>
          <circle cx="68" cy="45" r="1.5" fill="#D6AD7B" fillOpacity="0.6"/>
        </svg>
        
        {/* Sombra del logo */}
        <div className={`w-${logo / 8} h-${logo / 8} absolute -bottom-1 -right-1 border border-red-900/20 rounded-sm transform -rotate-2`}></div>
      </div>
      
      {showText && (
        <div className="ml-3 flex flex-col">
          <h1 className={`font-bold text-amber-100 uppercase tracking-wide ${text}`}>
            Revachol Discourse
          </h1>
          <p className="text-xs text-amber-500/80 font-serif italic">
            Psychic Communications
          </p>
        </div>
      )}
    </div>
  );
};

export default AppLogo; 