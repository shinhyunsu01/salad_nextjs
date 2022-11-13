import React from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

interface Iprops {
	name: string;
	value: string | number;
	register: UseFormRegisterReturn;
}

export const ItemView = ({ name, value, register }: Iprops) => {
	return (
		<>
			<div className="font-bold text-xl underline underline-offset-8 decoration-[#aabaa5]">
				{name}
			</div>
			<input
				defaultValue={value}
				{...register}
				placeholder={value + ""}
				className="w-full text-center bg-slate-100 py-2 rounded-md my-4 outline-none focus:ring-offset-2 focus:ring-2 focus:ring-[#0c4941] focus:rounded-lg"
			/>
		</>
	);
};
