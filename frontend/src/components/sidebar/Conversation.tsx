import useConversation from "../../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, emoji }: any) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	const isSelected = selectedConversation?.id === conversation.id;
	const isOnline = onlineUsers.includes(conversation.id);

	return (
		<div
			onClick={() => setSelectedConversation(conversation)}
			className={`flex items-center gap-3 p-2.5 py-3.5 cursor-pointer transition-colors relative rounded-md
				${
					isSelected 
						? "bg-stone-900 border-l-2 border-red-700/80" 
						: "hover:bg-stone-900/40 border-l-2 border-transparent hover:border-amber-700/40"
				}`}
		>
			<div className="relative">
				<div className={`relative ${isSelected ? "transform rotate-1" : ""}`}>
					<img
						src={conversation.profilePic}
						alt="User Avatar"
						className={`w-10 h-10 rounded-md object-cover border 
							${isSelected 
								? "border-amber-700/80 shadow-lg" 
								: "border-amber-900/30"
							}`}
					/>
					{isSelected && (
						<div className="absolute inset-0 border border-red-900/20 rounded-md transform -rotate-2"></div>
					)}
				</div>
				{isOnline && (
					<div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border border-stone-900"></div>
				)}
			</div>

			<div className="flex-1 overflow-hidden">
				<h3 className={`font-medium truncate ${isSelected ? "text-amber-200 uppercase tracking-wide text-sm" : "text-amber-100/90 text-sm"}`}>
					{conversation.fullName}
				</h3>
				<p className="text-xs truncate text-amber-500/80 font-serif italic">
					{isOnline ? "Consciousness present" : "Mind adrift"}
				</p>
			</div>

			<span className="text-lg opacity-75">{emoji}</span>
			
			{isSelected && (
				<div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-900/0 via-amber-700/30 to-red-900/0"></div>
			)}
		</div>
	);
};

export default Conversation;