import React from "react";

interface Iprops {
	options: string[];
	onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
}

export const Select = ({ options, onChange }: Iprops) => {
	return (
		<select
			className="appearance-none border hover:cursor-pointer outline-none rounded-lg font-bold px-4 py-2 h-10 m-2 select-bordered text-[#0c4941]"
			onChange={onChange}
		>
			{options?.map((ele, index) => (
				<option key={index}>{ele}</option>
			))}
		</select>
	);
};
