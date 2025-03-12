import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AvatarStyleSelector } from '../components/AvatarStyleSelector';
import { useAuthContext } from '../context/AuthContext';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

const Profile = () => {
  const navigate = useNavigate();
  const { authUser, isLoading: authLoading } = useAuthContext();
  const { updateProfile, isLoading: updateLoading } = useUpdateProfile();
  
  const [fullName, setFullName] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // If user isn't authenticated, redirect to login
  if (!authLoading && !authUser) {
    return <Navigate to="/login" />;
  }
  
  const handleEditClick = () => {
    setIsEditing(true);
    if (authUser) {
      setFullName(authUser.fullName);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedStyle(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await updateProfile({
      fullName: fullName !== authUser?.fullName ? fullName : undefined,
      avatarStyle: selectedStyle || undefined,
    });
    
    if (result) {
      setIsEditing(false);
      setSelectedStyle(null);
    }
  };
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-5 h-5 border-2 border-t-transparent border-amber-700/70 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 text-amber-100">
      <div className="bg-stone-900/80 shadow-lg rounded-md border border-amber-900/40 p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0"></div>
        
        <h2 className="text-xl uppercase tracking-wide text-amber-500/90 font-bold mb-6">Detective's Mind File</h2>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-8 relative">
            <div className="relative transform rotate-1">
              <img 
                src={authUser?.profilePic} 
                alt={authUser?.fullName} 
                className="w-40 h-40 rounded-md object-cover border border-amber-700/80 shadow-lg" 
              />
              <div className="absolute inset-0 border border-red-900/20 rounded-md transform -rotate-2"></div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-full h-full border border-amber-900/30 rounded-md"></div>
          </div>
          
          <div className="flex-1">
            {!isEditing ? (
              // Profile View Mode
              <div className="relative">
                <h1 className="text-2xl font-bold text-amber-200 uppercase tracking-wide">{authUser?.fullName}</h1>
                <p className="text-amber-500/80 mt-1 font-serif italic">ID: {authUser?.email?.split('@')[0]}</p>
                <p className="mt-3 text-sm text-amber-100/80">
                  This detective has experienced various states of consciousness. The exact number remains uncertain.
                </p>
                <div className="mt-6 flex space-x-4">
                  <button 
                    onClick={handleEditClick}
                    className="px-5 py-2.5 bg-red-900/30 hover:bg-red-800/40 text-amber-100 uppercase tracking-wider 
                      font-bold text-sm border border-amber-800/30 transform transition hover:-translate-y-0.5 
                      shadow-md rounded-md"
                  >
                    Modify Identity
                  </button>
                  <button 
                    onClick={handleGoBack}
                    className="px-5 py-2.5 bg-stone-800/40 hover:bg-stone-700/40 text-amber-100 uppercase tracking-wider 
                      font-bold text-sm border border-amber-900/20 transform transition hover:-translate-y-0.5 
                      shadow-md rounded-md"
                  >
                    Return to Field
                  </button>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSubmit} className="relative">
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm uppercase tracking-wide text-amber-500/90 font-bold mb-2">
                    Detective Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-900/60 border border-amber-900/40 text-amber-100 
                      placeholder-amber-700/70 text-sm focus:outline-none focus:ring-1 focus:ring-red-700/40 
                      focus:border-red-700/40 rounded-md shadow-inner"
                    required
                  />
                </div>
                
                <AvatarStyleSelector 
                  onSelectStyle={setSelectedStyle} 
                  selectedStyle={selectedStyle} 
                />
                
                <div className="mt-8 flex space-x-4">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-5 py-2.5 bg-red-900/30 hover:bg-red-800/40 text-amber-100 uppercase tracking-wider 
                      font-bold text-sm border border-amber-800/30 transform transition hover:-translate-y-0.5 
                      shadow-md rounded-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {updateLoading ? (
                      <span className="flex items-center">
                        <span className="inline-block w-4 h-4 border-2 border-t-transparent border-amber-100 rounded-full animate-spin mr-2"></span>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Identity'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 bg-stone-800/40 hover:bg-stone-700/40 text-amber-100 uppercase tracking-wider 
                      font-bold text-sm border border-amber-900/20 transform transition hover:-translate-y-0.5 
                      shadow-md rounded-md"
                  >
                    Decline
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 