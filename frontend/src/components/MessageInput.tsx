import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form onSubmit={handleSubmit} className="px-5 py-4 relative h-[110px] flex-shrink-0 w-full">
			<div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-red-900/0 via-amber-700/30 to-red-900/0"></div>
			
			<div className="relative w-full">
				<textarea
					className="w-full bg-stone-900/50 border border-amber-900/30 rounded-md px-4 py-3 pr-12
						text-amber-100 placeholder-amber-700/60 focus:outline-none focus:ring-1 
						focus:ring-red-700/30 focus:border-red-700/30 resize-none text-base h-[70px]"
					placeholder="Transmit your thoughts to another consciousness..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				
				<button
					type="submit"
					className="absolute right-3 bottom-3 p-2 rounded-md bg-amber-900/20 text-amber-200
						hover:bg-red-800/30 transition-colors disabled:opacity-50"
					disabled={loading || !message.trim()}
				>
					<Send className="w-5 h-5" strokeWidth={1.75} />
				</button>
			</div>
			
			<div className="mt-2 text-sm text-amber-500/70 italic pl-2 flex justify-between w-full">
				<span>Speak carefully. Words create worlds.</span>
				{loading && <span>Transmitting to the void...</span>}
			</div>
		</form>
	);
};

export default MessageInput;