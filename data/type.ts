export interface item {
	name: string;
	amount: number | string;
	tag: string;
	unit: string;
	id: number;
	minamount: number | string;
}

export const defaultValue = {
	name: "",
	amount: "",
	tag: "",
	unit: "",
	minamount: "",
	id: 9999,
};
