import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ProfileButton = () => {
  const { authUser } = useAuthContext();

  if (!authUser) return null;

  return (
    <Link
      to="/profile"
      className="flex items-center gap-3 p-2.5 rounded-md bg-amber-900/20 hover:bg-amber-800/30 
        border border-amber-900/40 transition-all hover:-translate-y-0.5"
    >
      <img
        src={authUser.profilePic}
        alt={authUser.fullName}
        className="w-8 h-8 rounded-md object-cover border border-amber-700/50"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-amber-200 truncate">
          {authUser.fullName}
        </h3>
        <p className="text-xs text-amber-500/80 font-serif italic">
          View your detective profile
        </p>
      </div>
      <User className="w-4 h-4 text-amber-500/80" strokeWidth={1.75} />
    </Link>
  );
};

export default ProfileButton; 