import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
interface ConversationType {
	id: string;
	fullName: string;
	profilePic: string;
	emoji?: string;
}

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c: any) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			const conversationWithStringId: ConversationType = {
				...conversation,
				id: String(conversation.id)
			};
			
			setSelectedConversation(conversationWithStringId);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search for minds..."
				className="w-full py-2.5 px-4 pl-10 bg-stone-900/60 border border-amber-900/40 text-amber-100 placeholder-amber-700/70 
				text-sm focus:outline-none focus:ring-1 focus:ring-red-700/40 focus:border-red-700/40 rounded-md"
			/>
			<Search
				className="absolute left-3 top-3 text-amber-700/70 w-4.5 h-4.5"
				strokeWidth={1.75}
			/>
			<div className="absolute left-0 bottom-0 h-px w-full bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0"></div>
		</form>
	);
};
export default SearchInput;