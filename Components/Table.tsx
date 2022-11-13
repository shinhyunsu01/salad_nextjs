import React from "react";
import { item } from "../data/type";
import useMutation from "../libs/client/useMutation";

interface Ipros {
	data: item[];
	onClick(index?: number): void;
}
export const Table = ({ data, onClick }: Ipros) => {
	const [itemsFn] = useMutation("/api/items");

	const btnOnClick = (index: number) => {
		const item = data[index];
		item.click = !item.click;
		itemsFn(item);
	};
	//12 73 65
	return (
		<table className="w-full   ">
			<thead className=" sticky top-0">
				<tr className=" text-white bg-[#0c4941] font-bold text-lg h-12 ">
					<th></th>
					<th>태그</th>
					<th>목록</th>
					<th>수량</th>
				</tr>
			</thead>
			<tbody className="text-center">
				{data.map((ele, index) => (
					<tr
						key={index}
						className=" h-12 hover:bg-slate-100 hover:cursor-pointer border-b-2"
					>
						<td className="pl-4 w-10">
							<button
								className="border text-black px-2 rounded-lg py-2"
								onClick={() => btnOnClick(index)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.5 12.75l6 6 9-13.5"
									/>
								</svg>
							</button>
						</td>
						<td onClick={() => onClick(index)} className="text-gray-600">
							{ele.tag}
						</td>
						<td
							onClick={() => onClick(index)}
							className={
								ele.amount <= ele.minamount
									? "text-blue-500 font-bold"
									: ele.click === true
									? "text-red-500 font-bold"
									: "font-bold"
							}
						>
							{ele.name}
						</td>
						<td onClick={() => onClick(index)}>
							<div className="flex items-center justify-center">
								{ele.amount <= ele.minamount ? (
									<div className="h-4 w-4 rounded-full bg-blue-500"></div>
								) : null}

								<span
									className={
										ele.amount <= ele.minamount
											? "text-blue-500 font-bold"
											: ele.click === true
											? "text-red-500 font-bold"
											: "font-bold"
									}
								>
									&nbsp;
									{ele.amount}
								</span>
								<span
									className={
										ele.amount <= ele.minamount
											? "text-blue-500 font-bold"
											: ele.click === true
											? "text-red-500 font-bold"
											: "font-bold"
									}
								>
									{ele.unit}
								</span>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
/*


*/
