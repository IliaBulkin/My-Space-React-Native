export interface IProfileCardProps {
	placeholder?: string;
	label: string;
	type: "text" | "tel" | "date" | "email" | "username";
	editable: boolean,
	// defaultValue?: string,
	value: string,
	onChangeText?: (text: string) => void
	errorMessage?: string
}