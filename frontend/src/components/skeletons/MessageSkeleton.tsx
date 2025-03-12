const MessageSkeleton = () => {
	return (
		<div className="flex-1 w-full flex flex-col justify-between py-5">
			{/* Mensaje recibido */}
			<div className="flex justify-start w-full">
				<div className="flex max-w-[80%] gap-3">
					<div className="flex-shrink-0 hidden sm:block">
						<div className="w-9 h-9 mr-2 bg-stone-800/70 border border-amber-900/30 rounded-md"></div>
					</div>
					<div className="flex flex-col items-start">
						<div className="px-4 py-2.5 rounded-md bg-stone-800/80 border-l-2 border-amber-900/20 w-48">
							<div className="h-3.5 bg-amber-900/20 rounded-full mb-2 w-full"></div>
							<div className="h-3.5 bg-amber-900/20 rounded-full w-3/4"></div>
							<div className="h-3.5 bg-amber-900/20 rounded-full mt-2 w-1/2"></div>
						</div>
						<div className="mt-1.5 w-16 h-3 bg-amber-900/10 rounded-full ml-1"></div>
					</div>
				</div>
			</div>

			{/* Espacio flexible para mantener la estructura */}
			<div className="flex-1 min-h-[100px]"></div>

			{/* Mensaje enviado - medio */}
			<div className="flex justify-end w-full">
				<div className="flex max-w-[80%] flex-row-reverse gap-3">
					<div className="flex-shrink-0 hidden sm:block">
						<div className="w-9 h-9 ml-2 bg-stone-800/70 border border-amber-900/30 rounded-md"></div>
					</div>
					<div className="flex flex-col items-end">
						<div className="px-4 py-2.5 rounded-md bg-red-900/30 border-r-2 border-amber-700/30 w-56">
							<div className="h-3.5 bg-amber-900/20 rounded-full mb-2 w-full"></div>
							<div className="h-3.5 bg-amber-900/20 rounded-full w-2/3"></div>
							<div className="h-3.5 bg-amber-900/20 rounded-full mt-2 w-3/4"></div>
						</div>
						<div className="mt-1.5 w-16 h-3 bg-amber-900/10 rounded-full mr-1"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageSkeleton;