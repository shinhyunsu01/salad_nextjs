export interface item {
	name: string;
	amount: number | string;
	tag: string;
	unit: string;
	id: number;
	minamount: number;
}

export const defaultValue = {
	name: "",
	amount: "",
	tag: "",
	unit: "",
	id: 9999,
};
