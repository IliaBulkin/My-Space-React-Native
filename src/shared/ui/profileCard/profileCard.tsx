import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { IProfileCardProps } from "./profileCard.types";
import { styles } from "./profileCard.styles";
import { useEffect, useState } from "react";
import { ICONS } from "../icons";

export function ProfileCard(props: IProfileCardProps) {
	const {
		onChangeText,
		placeholder,
		label,
		editable,
		type,
		value,
		errorMessage,
		isHidden,
		setIsHidden
	} = props;


	// useEffect(() => {
	// 	console.log("component",value)
	// }, [value])

	return (
		<View style={styles.card}>
			<View>
				<Text
					style={[
						styles.label,
						editable ? styles.labelActive : styles.labelDisabled,
					]}
				>
					{label}
				</Text>
			</View>
			{type === "password" ? (
				<View
					style={{
						// width: "100%",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						gap: 10,
					}}
				>
					<TextInput
						style={[
							styles.input,
							editable
								? styles.inputActive
								: styles.inputDisabled,
							{flex: 1, flexShrink: 1}
						]}
						editable={editable}
						placeholder={placeholder}
						value={value}
						onChangeText={onChangeText}
						secureTextEntry={isHidden}
					/>
					<TouchableOpacity
						onPress={() => {
							if (editable) setIsHidden?.(!isHidden);
						}}
					>
						{isHidden ? (
							<ICONS.EyeCrossedIcon width={20} height={20} />
						) : (
							<ICONS.EyeIcon width={20} height={20} />
						)}
					</TouchableOpacity>
				</View>
			) : (
				<TextInput
					keyboardType={type === "tel" ? "phone-pad" : "default"}
					style={[
						styles.input,
						editable ? styles.inputActive : styles.inputDisabled,
					]}
					editable={type === "date" ? false : editable}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
				/>
			)}

			<View>
				{errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : undefined}
			</View>
		</View>
	);
}
