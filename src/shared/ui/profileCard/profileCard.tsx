import { View, Text, TextInput } from "react-native";
import { IProfileCardProps } from "./profileCard.types";
import { styles } from "./profileCard.styles";
import { useEffect } from "react";

export function ProfileCard(props: IProfileCardProps) {
	const { onChangeText, placeholder, label, editable, type, value, errorMessage } =
		props;

	// useEffect(() => {
	// 	console.log("component",value)
	// }, [value])

	return (
		<View style={styles.card}>
			<View>
				<Text style={[styles.label, editable ? styles.labelActive : styles.labelDisabled]}>{label}</Text>
			</View>
			<TextInput
				keyboardType={type === "tel" ? "phone-pad": "default"}
				style={[styles.input, editable ? styles.inputActive : styles.inputDisabled]}
				editable={
					type === "date"
					? false
					: editable
				}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
			/>
			<View>
				{
					errorMessage
					? <Text style={styles.errorMessage}>{errorMessage}</Text>
					: undefined
				}
			</View>
		</View>
	);
}
