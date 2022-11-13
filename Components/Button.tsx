import React from "react";

interface Ipros {
	text: string;
	onClick(): void;
}

export const Button = ({ text, onClick }: Ipros) => {
	return (
		<button
			onClick={onClick}
			className="bg-[#0c4941] text-white font-bold px-4 py-2 m-2 rounded-lg"
		>
			{text}
		</button>
	);
};
