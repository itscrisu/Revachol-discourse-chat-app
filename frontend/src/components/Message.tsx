import useConversation, { MessageType } from "../../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";

const Message = ({ message }: { message: MessageType }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const fromMe = message?.senderId === authUser?.id;
	const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
	const shakeClass = message.shouldShake ? "animate-pulse" : "";

	return (
		<div className={`flex w-full ${fromMe ? "justify-end" : "justify-start"} ${shakeClass}`}>
			<div className={`flex max-w-[80%] ${fromMe ? "flex-row-reverse" : "flex-row"} gap-3`}>
				{/* Avatar */}
				<div className="flex-shrink-0 hidden sm:block">
					<div className={`relative w-9 h-9 ${fromMe ? "ml-2" : "mr-2"}`}>
						<img
							src={img}
							alt="Avatar"
							className="w-9 h-9 rounded-md object-cover border border-amber-900/40"
						/>
						{fromMe && <div className="absolute inset-0 border border-red-900/20 rounded-md transform rotate-1"></div>}
					</div>
				</div>

				{/* Message bubble */}
				<div className={`flex flex-col ${fromMe ? "items-end" : "items-start"} max-w-full`}>
					<div 
						className={`px-4 py-2.5 rounded-md relative inline-block max-w-full
							${fromMe 
								? "bg-red-900/30 border-r-2 border-amber-700/40 mr-0" 
								: "bg-stone-800/90 border-l-2 border-amber-700/30 ml-0"
							}
						`}
					>
						<p className="text-base text-amber-100 leading-relaxed break-words">{message.body}</p>
						
						{/* Decorative elements */}
						<div className={`absolute top-0 ${fromMe ? "right-0" : "left-0"} h-0.5 w-1/4 bg-gradient-to-r from-amber-700/20 to-transparent`}></div>
					</div>
					
					<div className={`text-xs text-amber-500/70 mt-1.5 ${fromMe ? "text-right" : "text-left"} pl-1 pr-1`}>
						{extractTime(message.createdAt)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;