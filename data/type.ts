export interface item {
	name: string;
	amount: number | string;
	tag: string;
	unit: string;
	id: number;
	minamount: number | string;
	click: boolean;
}

export const defaultValue = {
	name: "",
	amount: "",
	tag: "",
	unit: "",
	minamount: "",
	id: 9999,
	click: false,
};
