import React from "react";
import { useForm } from "react-hook-form";
import { item } from "../data/type";

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

	return (
		<div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className=" w-full flex flex-col items-center"
			>
				<div className="font-bold text-xl underline underline-offset-8 decoration-green-300">
					자재
				</div>
				<input
					defaultValue={item.name}
					{...register("name", { required: "품목 is required" })}
					placeholder={item.name}
					className="text-center bg-slate-100 py-2 rounded-md my-4 outline-none focus:ring-offset-2 focus:ring-2 focus:ring-green-300 focus:rounded-lg"
				/>

				<div className="font-bold text-xl underline underline-offset-8 decoration-green-300">
					태그
				</div>
				<input
					defaultValue={item.tag}
					placeholder={item.tag}
					{...register("tag", { required: "태그 is required" })}
					className="text-center bg-slate-100 py-2 rounded-md my-4 outline-none focus:ring-offset-2 focus:ring-2 focus:ring-green-300 focus:rounded-lg"
				/>

				<div className="font-bold text-xl underline underline-offset-8 decoration-green-300">
					수량
				</div>

				<input
					type="number"
					defaultValue={item.amount}
					{...register("amount", { required: "수량 is required" })}
					className="text-center bg-slate-100 py-2 rounded-md my-4 outline-none focus:ring-offset-2 focus:ring-2 focus:ring-green-300 focus:rounded-lg"
				/>

				<div className="font-bold text-xl underline underline-offset-8 decoration-green-300">
					단위
				</div>

				<input
					defaultValue={item.unit}
					placeholder={item.unit}
					{...register("unit", { required: "단위 is required" })}
					className="text-center bg-slate-100 py-2 rounded-md my-4 outline-none focus:ring-offset-2 focus:ring-2 focus:ring-green-300 focus:rounded-lg"
				/>
				{errors && errors.name && (
					<span className="text-red-500">{errors.name?.message + ""}</span>
				)}
				{errors && errors.tag && (
					<span className="text-red-500">{errors.tag?.message + ""}</span>
				)}
				{errors && errors.unit && (
					<span className="text-red-500">{errors.unit?.message + ""}</span>
				)}
				{errors && errors.amount && (
					<span className="text-red-500">{errors.amount?.message + ""}</span>
				)}
				<button className=" w-full my-2 bg-black text-green-300 font-bold px-4 py-2 rounded-lg">
					저장
				</button>
			</form>
		</div>
	);
};
