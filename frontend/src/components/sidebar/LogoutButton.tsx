import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<button 
			onClick={logout} 
			disabled={loading}
			className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 
				bg-red-900/30 hover:bg-red-800/40 text-amber-100 uppercase tracking-wider 
				font-bold text-sm border border-amber-800/30 transform transition 
				hover:-translate-y-0.5 shadow-md rounded-md"
		>
			{loading ? (
				<span className="inline-block w-4 h-4 border-2 border-t-transparent border-amber-100 rounded-full animate-spin"></span>
			) : (
				<>
					<LogOut className="w-4.5 h-4.5" strokeWidth={1.75} />
					<span>ABANDON CONSCIOUSNESS</span>
				</>
			)}
		</button>
	);
};

export default LogoutButton;