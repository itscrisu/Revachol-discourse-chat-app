import { useEffect, useState } from 'react';

interface AvatarPreviewProps {
  username: string;
  gender: string;
}

const AvatarPreview = ({ username, gender }: AvatarPreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  useEffect(() => {
    if (!username || !gender) return;
    
    const generatePreviewUrl = () => {
      const styles = {
        male: [
          'adventurer',
          'adventurer-neutral',
          'pixel-art',
          'lorelei',
          'micah'
        ],
        female: [
          'adventurer',
          'adventurer-neutral',
          'pixel-art',
          'lorelei',
          'micah'
        ]
      };

      const usernameSum = [...username].reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const styleArray = gender === 'male' ? styles.male : styles.female;
      const selectedStyle = styleArray[usernameSum % styleArray.length];
      
      const seed = username.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      const backgroundColor = gender === 'male' ? '8b4513' : '7c3030';
      
      return `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}&backgroundColor=${backgroundColor}`;
    };
    
    setPreviewUrl(generatePreviewUrl());
  }, [username, gender]);
  
  if (!previewUrl) return null;
  
  return (
    <div className="flex items-center mb-4">
      <div className="relative w-16 h-16 mr-4">
        <img 
          src={previewUrl} 
          alt="Avatar Preview" 
          className="w-full h-full rounded-md border-2 border-amber-700/70 object-cover"
        />
        <div className="absolute inset-0 border border-red-900/20 rounded-md transform rotate-1"></div>
      </div>
      <div>
        <p className="text-amber-200 italic text-sm">
          <span className="text-amber-400 uppercase font-semibold tracking-wide">Facial reconstruction:</span> This is how your consciousness will appear to others.
        </p>
      </div>
    </div>
  );
};

export default AvatarPreview; 