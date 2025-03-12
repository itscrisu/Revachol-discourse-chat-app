import { useEffect, useRef } from "react";
import { MessageType } from "../../zustand/useConversation";
import useGetMessages from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";
import Message from "./Message";
import MessageSkeleton from "./skeletons/MessageSkeleton";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	useListenMessages();

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="flex-1 overflow-y-auto w-full min-w-0">
			<div className="h-full w-full flex flex-col min-w-0">
				{loading ? (
					<MessageSkeleton />
				) : messages.length === 0 ? (
					<div className="flex-1 flex items-center justify-center w-full">
						<div className="bg-stone-900/30 px-5 py-4 rounded-md border-l-2 border-amber-900/40 max-w-md">
							<p className="text-base italic text-amber-200/90 leading-relaxed">
								<span className="text-amber-100 uppercase tracking-wider mr-1 font-semibold">Begin your investigation...</span>
								The first message sets the tone for your dialogue with this consciousness.
							</p>
						</div>
					</div>
				) : (
					<div className="flex-1 flex flex-col py-4 px-3 space-y-6 w-full min-w-0">
						{messages.map((message: MessageType) => (
							<Message key={message.id} message={message} />
						))}
						<div ref={messagesEndRef} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Messages;