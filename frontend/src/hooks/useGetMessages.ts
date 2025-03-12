import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import { DUMMY_MESSAGES } from "../data/dummy";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation) return;
			setLoading(true);
			setMessages([]);
			
			try {
				// ====================================================================
				// DEVELOPMENT MODE: Uncomment this section to use dummy data directly
				// and comment out the API call below
				// ====================================================================
				
				// setMessages(DUMMY_MESSAGES as MessageType[]);
				// setLoading(false);
				// return;
				
				// ====================================================================
				// PRODUCTION MODE: Uncomment the API call and comment out the dummy data
				// ====================================================================
				
				const res = await fetch(`/api/messages/${selectedConversation.id}`);
				const data = await res.json();
				
				if (!res.ok) throw new Error(data.error || "An error occurred");
				
				setMessages(data);
			} catch (error: any) {
				console.warn("Error fetching messages, using dummy data instead:", error.message);
				toast.error("Using demo messages - API connection failed");
				
				setMessages(DUMMY_MESSAGES.map(msg => ({
					...msg,
					senderId: msg.fromMe ? 'user-id' : `sender-${msg.id}`
				})) as any);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation, setMessages]);

	return { messages, loading };
};

export default useGetMessages;