import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "../Components/Button";
import { Item } from "../Components/Item";
import { Logo } from "../Components/Logo";
import { Modal } from "../Components/Modal";
import { Select } from "../Components/Select";
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
					if (ele.id === +changeValue.id) return changeValue;
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
				<Logo />
			</div>
			<div className=" w-full grid grid-cols-2">
				<div>
					<span className="font-bold ">Select : </span>
					{options && <Select options={options} onChange={onChange} />}
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
