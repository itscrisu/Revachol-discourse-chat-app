import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DUMMY_CONVERSATIONS } from "../data/dummy";

interface ConversationType {
	id: string | number;
	fullName: string;
	profilePic: string;
	emoji?: string;
}

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState<ConversationType[]>([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				// ====================================================================
				// DEVELOPMENT MODE: Uncomment this section to use dummy data directly
				// and comment out the API call below
				// ====================================================================
				
				// setConversations(DUMMY_CONVERSATIONS as ConversationType[]);
				// setLoading(false);
				// return;
				
				// ====================================================================
				// PRODUCTION MODE: Uncomment the API call and comment out the dummy data
				// ====================================================================
				
				const res = await fetch("/api/messages/conversations");
				const data = await res.json();
				
				if (data.error) {
					throw new Error(data.error);
				}
				
				setConversations(data);
			} catch (error: any) {
				console.warn("Error fetching conversations, using dummy data instead:", error.message);
				toast.error("Using demo data - API connection failed");
				
				setConversations(DUMMY_CONVERSATIONS as ConversationType[]);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;