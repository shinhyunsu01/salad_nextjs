import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "../Components/Button";
import { Item } from "../Components/Item";
import { Modal } from "../Components/Modal";
import { item } from "../data/type";
import useMutation from "../libs/client/useMutation";

interface resItems {
	ok: boolean;
	items: item[];
}

export default function Home() {
	const { data: resData, mutate } = useSWR<resItems>("/api/items");
	const [itemsFn, { data, loading, error }] = useMutation("/api/items");

	const [filterData, setFilterData] = useState<item[]>();
	const [itemClick, isItemClick] = useState(false);
	const [addClick, isAddClick] = useState(false);
	const [options, setOptions] = useState<string[]>();

	const defaultValue = {
		name: "",
		amount: 0,
		tag: "",
		unit: "",
		id: 0,
	};

	const [clickItemData, setClickItemData] = useState<item>(defaultValue);

	const onClick = (index?: number) => {
		isItemClick(true);

		if (index) if (resData) setClickItemData(resData.items[index]);

		setClickItemData(defaultValue);
	};
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (resData) {
			if (e.target.value === "모두") setFilterData(resData.items);
			else
				setFilterData(
					resData.items.filter((ele) => ele.tag === e.target.value)
				);
		}
	};

	const itemonChange = (changeValue: item) => {
		itemsFn(changeValue);
	};
	useEffect(() => {
		if (data) {
			isItemClick(false);
			mutate();
		}
	}, [data, mutate]);
	useEffect(() => {
		if (resData?.items) {
			let filter = resData?.items.map((ele) => ele.tag);
			setFilterData(resData?.items);
			setOptions(Array.from(new Set(["모두", ...filter])));
		}
	}, [resData]);

	return (
		<div className="p-4 h-full w-full   flex flex-col">
			{addClick ? <Modal value={addClick} onClick={isAddClick} /> : null}
			{itemClick ? (
				<Modal value={itemClick} onClick={isItemClick}>
					{clickItemData && (
						<Item item={clickItemData} onChange={itemonChange} />
					)}
				</Modal>
			) : null}
			<div className="w-full flex justify-center">
				<div className="font-bold text-2xl">Enough Salad</div>
			</div>
			<div className=" w-full grid grid-cols-2">
				<div>
					<span className="font-bold ">Select : </span>
					<select
						className="appearance-none border hover:cursor-pointer outline-none rounded-lg font-bold px-4 py-2 h-10 m-2 select-bordered text-green-300"
						onChange={onChange}
					>
						{options?.map((ele, index) => (
							<option key={index}>{ele}</option>
						))}
					</select>
				</div>
				<div className="flex justify-end">
					<Button text="추가" onClick={onClick} />
				</div>
			</div>
			<div className="h-full overflow-y-auto  w-full">
				<table className="w-full   ">
					<thead className=" sticky top-0">
						<tr className="bg-green-300 font-bold text-lg h-12 ">
							<th>태그</th>
							<th>목록</th>
							<th>수량</th>
						</tr>
					</thead>
					<tbody className="text-center">
						{filterData &&
							filterData.map((ele, index) => (
								<tr
									key={index}
									onClick={() => onClick(index)}
									className=" h-12 hover:bg-slate-100 hover:cursor-pointer border-b-2"
								>
									<td>{ele.tag}</td>
									<td>{ele.name}</td>
									<td>
										{ele.amount}
										{ele.unit}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
