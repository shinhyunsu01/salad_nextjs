import React from "react";
import { Close } from "../icon/icons";

interface Iprops {
	children?: React.ReactNode;
	value: boolean;
	onClick(value: boolean): void;
}

export const Modal = ({ children, onClick, value }: Iprops) => {
	return (
		<div className="w-full h-full absolute z-10 ">
			<div className="w-full h-full flex justify-center items-center">
				<div className="rounded-lg border-2 w-60 h-[500px] p-4 bg-white absolute">
					<button
						onClick={() => onClick(!value)}
						className="absolute right-4 top-4 hover:cursor-pointer z-10"
					>
						<Close />
					</button>
					{children}
				</div>
			</div>
		</div>
	);
};
