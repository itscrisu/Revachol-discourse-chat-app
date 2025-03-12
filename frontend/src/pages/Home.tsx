import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuthContext } from "../context/AuthContext";

function Home() {
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-screen bg-stone-900 text-amber-100 overflow-hidden font-sans w-full min-w-[1024px]">
      {/* Sidebar con estilo Disco Elysium modernizado */}
      <div className="w-1/3 max-w-xs min-w-[280px] border-r border-amber-900/30 bg-gradient-to-b from-stone-800 to-stone-900 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-amber-900/30">
          <h1 className="text-xl font-bold text-amber-200 tracking-wide">
            <span className="text-red-400 italic font-serif">THOUGHT</span> CABINET
          </h1>
          {authUser && (
            <div className="flex items-center gap-3 mt-4">
              <div className="relative">
                <img 
                  src={authUser.profilePic} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-md object-cover border-2 border-amber-700/70 shadow-lg transform rotate-1"
                />
                <div className="absolute inset-0 border border-red-900/20 rounded-md transform -rotate-2"></div>
              </div>
              <div>
                <h2 className="font-bold text-amber-100 uppercase tracking-wide text-sm">{authUser.fullName}</h2>
                <p className="text-amber-200/80 text-xs">{authUser.email}</p>
              </div>
            </div>
          )}
          <div className="mt-4 bg-stone-900/50 p-3 rounded-md border-l-2 border-red-800/50 text-sm italic">
            <p className="leading-relaxed text-amber-100/90">
              Your consciousness is connected. The voices await.
            </p>
          </div>
        </div>
        
        {/* Sidebar component */}
        <div className="flex-1 overflow-hidden">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-stone-800 relative overflow-hidden min-w-0">
        {/* Custom border-top decoration */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-900/0 via-amber-700/60 to-red-900/0"></div>
        
        {/* Message container wrapped with Disco Elysium styling */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col min-h-0 w-full">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;