import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

import { MessageCircle } from "lucide-react";

const MessageContainer = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className="w-full flex flex-col h-full min-w-0">
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<div className="flex flex-col h-full w-full min-w-0">
					{/* Header */}
					<div className="bg-stone-900/60 px-5 py-3.5 mb-2 border-b border-amber-900/20 flex items-center rounded-t-md flex-shrink-0 w-full">
						<div className="flex-1">
							<p className="text-sm text-amber-500/80 uppercase tracking-wider font-bold">DIALOGUE WITH:</p>
							<p className="text-amber-100 font-medium">{selectedConversation.fullName}</p>
						</div>
						<div className="w-9 h-9 rounded-md bg-gradient-to-br from-amber-900/20 to-red-900/10 flex items-center justify-center">
							<MessageCircle className="w-5 h-5 text-amber-500/70" strokeWidth={1.75} />
						</div>
					</div>

					<div className="flex-1 overflow-hidden w-full">
						<Messages />
					</div>
					
					<MessageInput />
				</div>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-7 py-8 text-center max-w-md bg-stone-900/30 border-l-2 border-amber-900/40 rounded-md">
				<p className="text-lg italic font-serif text-amber-200 mb-4 leading-relaxed">
					<span className="text-amber-100 font-bold uppercase tracking-wide mr-2">LIMBIC SYSTEM:</span> 
					Your mind awaits connection, Detective {authUser?.fullName}.
				</p>
				<p className="text-base text-amber-100/90 mb-6 italic">
					Select a consciousness from the list to begin your investigation into their thoughts...
				</p>
				<div className="w-16 h-16 mx-auto rounded-md bg-gradient-to-br from-amber-900/20 to-red-900/10 flex items-center justify-center">
					<MessageCircle className="w-8 h-8 text-amber-700/50" strokeWidth={1.75} />
				</div>
			</div>
		</div>
	);
};