import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "../Components/Button";
import { Item } from "../Components/Item";
import { Modal } from "../Components/Modal";
import { Table } from "../Components/Table";
import { defaultValue, item } from "../data/type";
import useMutation from "../libs/client/useMutation";

interface resItems {
	ok: boolean;
	items: item[];
}

export default function Home() {
	const { data: resData, mutate } = useSWR<resItems>("/api/items");
	const [itemsFn] = useMutation("/api/items");

	const [filterData, setFilterData] = useState<item[]>();
	const [itemClick, isItemClick] = useState(false);
	const [options, setOptions] = useState<string[]>();

	const [clickItemData, setClickItemData] = useState<item>(defaultValue);

	const onClick = (index?: number) => {
		isItemClick(true);

		if (index !== undefined) {
			if (resData) setClickItemData(resData.items[index]);
		} else setClickItemData(defaultValue);
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
		let lastId = resData && resData.items[resData?.items.length - 1].id + 1;
		console.log("changeValue", changeValue);
		if (+changeValue.id === 9999) {
			mutate(
				(prev: any) =>
					prev && {
						...prev,
						items: [
							...prev.items,
							{
								...changeValue,
								id: lastId,
							},
						],
					},
				false
			);
		} else {
			mutate((prev: any) => {
				const update = prev.items.map((ele: any) => {
					if (ele.id === +changeValue.id) {
						return changeValue;
					}
					return ele;
				});
				return { ...prev, items: update };
			}, false);
		}

		itemsFn(changeValue);
		isItemClick(false);
	};

	useEffect(() => {
		if (resData) {
			let filter = resData?.items.map((ele) => ele.tag);
			setFilterData(resData?.items);
			setOptions(Array.from(new Set(["모두", ...filter])));
		}
	}, [resData]);

	return (
		<div className="p-4 h-full w-full   flex flex-col">
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
					<Button text="추가" onClick={() => onClick()} />
				</div>
			</div>
			<div className="h-full overflow-y-auto  w-full">
				{filterData && <Table data={filterData} onClick={onClick} />}
			</div>
		</div>
	);
}
