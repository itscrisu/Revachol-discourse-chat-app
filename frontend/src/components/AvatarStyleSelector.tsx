import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

interface AvatarStyleSelectorProps {
  onSelectStyle: (style: string) => void;
  selectedStyle: string | null;
}

const AVATAR_STYLES = ['adventurer', 'adventurer-neutral', 'pixel-art', 'lorelei', 'micah'];

// Descriptions matching Disco Elysium's style
const STYLE_DESCRIPTIONS: Record<string, string> = {
  'adventurer': 'A portrait radiating determination. Suitable for detectives with a penchant for the impossible.',
  'adventurer-neutral': 'Balanced features. The face of reason in an unreasonable world.',
  'pixel-art': 'Distinctly digital. For those who have seen through the fabric of reality.',
  'lorelei': 'Otherworldly features. For detectives who commune with the invisible.',
  'micah': 'Abstract representation. For minds that transcend conventional perspective.'
};

export const AvatarStyleSelector = ({ onSelectStyle, selectedStyle }: AvatarStyleSelectorProps) => {
  const { authUser } = useAuthContext();
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (!authUser) return;
    
    // Generate preview URLs for each style
    const urls: Record<string, string> = {};
    AVATAR_STYLES.forEach(style => {
      const seed = authUser.fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const backgroundColor = authUser.gender === 'male' ? '8b4513' : '7c3030';
      urls[style] = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=${backgroundColor}`;
    });
    
    setPreviewUrls(urls);
  }, [authUser]);
  
  if (!authUser) return null;
  
  return (
    <div className="mt-6">
      <h3 className="text-sm uppercase tracking-wide text-amber-500/90 font-bold mb-3">Psychovisual Manifestation</h3>
      <div className="h-px bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0 mb-4"></div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {AVATAR_STYLES.map(style => (
          <div 
            key={style} 
            className={`cursor-pointer p-3 relative overflow-hidden rounded-md border 
              ${selectedStyle === style 
                ? 'border-amber-700/80 bg-red-900/30 shadow-lg transform -rotate-1' 
                : 'border-amber-900/40 bg-stone-900/60 hover:bg-stone-900 hover:border-amber-700/40'
              } transition-all duration-200`}
            onClick={() => onSelectStyle(style)}
          >
            <div className={`flex flex-col items-center ${selectedStyle === style ? 'transform rotate-1' : ''}`}>
              {previewUrls[style] && (
                <div className="relative mb-3">
                  <img 
                    src={previewUrls[style]} 
                    alt={`${style} style`} 
                    className={`w-20 h-20 rounded-md object-cover border 
                      ${selectedStyle === style ? 'border-amber-700/80' : 'border-amber-900/30'}`}
                  />
                  {selectedStyle === style && (
                    <div className="absolute inset-0 border border-red-900/20 rounded-md transform -rotate-2"></div>
                  )}
                </div>
              )}
              <span className="text-sm capitalize text-amber-200 font-medium">{style.replace('-', ' ')}</span>
            </div>
            
            {selectedStyle === style && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0"></div>
            )}
          </div>
        ))}
      </div>
      
      {selectedStyle && (
        <div className="mt-4 px-4 py-3 bg-amber-900/10 border border-amber-900/20 rounded-md">
          <p className="text-xs text-amber-100/90 font-serif italic">
            {STYLE_DESCRIPTIONS[selectedStyle]}
          </p>
        </div>
      )}
    </div>
  );
}; 