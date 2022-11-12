import React from "react";
import { useForm } from "react-hook-form";
import { item } from "../data/type";
import { ItemView } from "./ItemView";

interface Iprops {
	item: item;
	onChange(changeValue: item): void;
}

export const Item = ({ item, onChange }: Iprops) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		onChange({ id: item.id, ...data });
	};

	const errorUI = [
		{ message: errors.name?.message },
		{ message: errors.tag?.message },
		{ message: errors.amount?.message },
		{ message: errors.unit?.message },
		{ message: errors.minamount?.message },
	];
	const topItemUI = [
		{ korName: "자재", value: item.name, engName: "name" },
		{ korName: "태그", value: item.tag, engName: "tag" },
	];
	const middleItemUI = [
		{ korName: "수량", value: item.amount, engName: "amount" },
		{ korName: "단위", value: item.unit, engName: "unit" },
	];
	const bottomItemUI = {
		korName: "최소수량",
		value: item.minamount,
		engName: "minamount",
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" w-full flex flex-col items-center"
			>
				{topItemUI.map((ele, index) => (
					<div key={index} className="text-center">
						<ItemView
							value={ele.value}
							name={ele.korName}
							register={register(ele.engName, {
								required: `${ele.korName} is required`,
							})}
						/>
					</div>
				))}

				<div className="flex w-full">
					{middleItemUI.map((ele, index) => (
						<div key={index} className="w-full flex flex-col items-center px-4">
							<ItemView
								value={ele.value}
								name={ele.korName}
								register={register(ele.engName, {
									required: `${ele.korName} is required`,
								})}
							/>
						</div>
					))}
				</div>
				<ItemView
					value={bottomItemUI.value}
					name={bottomItemUI.korName}
					register={register(bottomItemUI.engName, {
						required: `${bottomItemUI.korName} is required`,
					})}
				/>

				{errors &&
					errorUI.map((ele, index) =>
						ele.message !== undefined ? (
							<span key={index} className="text-red-500">
								{ele.message + ""}
							</span>
						) : null
					)}
				<button className=" w-full my-2 bg-black text-green-300 font-bold px-4 py-2 rounded-lg">
					저장
				</button>
			</form>
		</div>
	);
};
