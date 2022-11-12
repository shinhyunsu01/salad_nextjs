import React from "react";
import { item } from "../data/type";

interface Ipros {
	data: item[];
	onClick(index?: number): void;
}
export const Table = ({ data, onClick }: Ipros) => {
	return (
		<table className="w-full   ">
			<thead className=" sticky top-0">
				<tr className="bg-green-300 font-bold text-lg h-12 ">
					<th>태그</th>
					<th>목록</th>
					<th>수량</th>
				</tr>
			</thead>
			<tbody className="text-center">
				{data.map((ele, index) => (
					<tr
						key={index}
						onClick={() => onClick(index)}
						className=" h-12 hover:bg-slate-100 hover:cursor-pointer border-b-2"
					>
						<td className="text-gray-600">{ele.tag}</td>
						<td className="font-bold">{ele.name}</td>
						<td>
							<div className="flex items-center justify-center">
								{ele.amount <= ele.minamount ? (
									<div className="h-4 w-4 rounded-full bg-orange-500"></div>
								) : null}

								<span className="font-bold">
									&nbsp;
									{ele.amount}
								</span>
								<span>{ele.unit}</span>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
