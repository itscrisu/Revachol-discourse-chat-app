import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
	const { conversations, loading } = useGetConversations();
	return (
		<div className="flex flex-col space-y-1.5">
			{conversations.map((conversation) => (
				<Conversation 
					key={conversation.id} 
					conversation={conversation} 
					emoji={getRandomEmoji()} 
				/>
			))}
			
			{loading ? (
				<div className="flex justify-center py-3">
					<div className="inline-block w-5 h-5 border-2 border-t-transparent border-amber-700/70 rounded-full animate-spin"></div>
				</div>
			) : conversations.length === 0 ? (
				<div className="px-4 py-5 text-center">
					<p className="text-sm italic text-amber-500/80">
						Your mind registers no connections. Search for others to begin a dialogue.
					</p>
				</div>
			) : null}
		</div>
	);
};

export default Conversations;