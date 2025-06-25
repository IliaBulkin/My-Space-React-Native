import { useState } from "react";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { styles } from "./tags-custom-input.styles";
import { ICONS } from "../../../../shared/ui/icons";

interface Props {
	value: string[];
	onChange: (tags: string[]) => void;
}

export function TagsCustomInput({ value, onChange }: Props) {
	const [customTag, setCustomTag] = useState("");

	const handleAddTag = () => {
		if (!customTag.trim()) return;

		if (value.length >= 10) {
			alert("Обмеження! Можна додати не більше 10 тегів");
			return;
		}

		if (value.includes(customTag.trim())) return;

		onChange([...value, customTag.trim()]);
		setCustomTag("");
	};

	const handleRemoveTag = (index: number) => {
		const updated = value.filter((_, i) => i !== index);
		onChange(updated);
	};

	function truncateText(text: string, maxLength: number = 15) {
		return text.length > maxLength
			? text.slice(0, maxLength) + "..."
			: text;
	}

	return (
		<View>
			<View style={styles.mainCustomTagsTextInputView}>
				<TextInput
					placeholder="Введіть свій тег"
					value={customTag}
					onChangeText={setCustomTag}
					style={styles.customTagsTextInput}
					placeholderTextColor={"#81818D"}
				/>
				<TouchableOpacity
					onPress={handleAddTag}
					style={styles.buttonAddCustomTag}
				>
					<Text
						style={{
							color: "#fff",
							fontFamily: "GTWalsheimPro-Regular",
						}}
					>
						Додати
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.mainTagsView}>
				{value.map((tag, index) => (
					<View key={index} style={styles.mappingTagsView}>
						<Text style={styles.textTags}>
							{" "}
							{truncateText(tag)}{" "}
						</Text>
						<TouchableOpacity
							onPress={() => handleRemoveTag(index)}
							style={{ marginLeft: 13 }}
						>
							<View style={styles.closeIconView}>
								<ICONS.CloseIcon
									color={"#FFFFFF"}
									width={10}
									height={10}
								/>
							</View>
						</TouchableOpacity>
					</View>
				))}
			</View>
		</View>
	);
}
