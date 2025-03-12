import AppLogo from "../AppLogo";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className="flex flex-col h-full">
			<div className="p-4 mb-1">
				<AppLogo size="sm" />
			</div>
			
			<div className="p-4">
				<SearchInput />
			</div>
			
			<div className="px-5 py-3">
				<p className="text-sm uppercase tracking-wide text-amber-500/90 font-bold">PSYCHIC CONNECTIONS</p>
				<div className="h-px bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0 my-2"></div>
			</div>
			
			<div className="flex-1 overflow-auto px-3">
				<Conversations />
			</div>
			
			<div className="p-4 border-t border-amber-900/20 mt-auto space-y-3">
				<ProfileButton />
				<LogoutButton />
			</div>
		</div>
	);
};

export default Sidebar;