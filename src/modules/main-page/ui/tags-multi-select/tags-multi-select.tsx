import { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./tags-multi-select.styles";

type Tag = {
	id: string;
	name: string;
};

type Props = {
	selectedTags: string[];
	onChange: (value: string[]) => void;
};

export function TagsMultiSelect({ selectedTags, onChange }: Props) {
	const BASE_URL = "192.168.3.11:3011";

	const [tags, setTags] = useState<Tag[]>([]);
	const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
	const [inputVisible, setInputVisible] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [tempSelected, setTempSelected] = useState<string[]>([]);

	useEffect(() => {
		const fetchTags = async () => {
			try {
				const response = await fetch(
					`http://${BASE_URL}/post/find-all-tags`
				);
				if (!response.ok)
					throw new Error(`HTTP error! status: ${response.status}`);

				const json = await response.json();
				const formattedTags: Tag[] = json.data.map((tag: any) => ({
					id: String(tag.id),
					name: tag.name,
				}));

				setTags(formattedTags);
				setFilteredTags(formattedTags);
			} catch (error) {
				console.error("Помилка при завантаженні тегів:", error);
			}
		};

		fetchTags();
	}, []);

	useEffect(() => {
		setTempSelected(selectedTags);
	}, [selectedTags]);

	useEffect(() => {
		setFilteredTags(
			tags.filter((tag) =>
				tag.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [searchTerm, tags]);

	const handleSelect = (tagName: string) => {
		setTempSelected((prev) =>
			prev.includes(tagName)
				? prev.filter((name) => name !== tagName)
				: [...prev, tagName]
		);
	};

	const handleConfirm = () => {
		onChange(tempSelected);
		setInputVisible(false);
	};

	const handleRemove = (tagName: string) => {
		onChange(selectedTags.filter((name) => name !== tagName));
		setTempSelected((prev) => prev.filter((name) => name !== tagName));
	};

	function truncateText(text: string, maxLength: number = 15) {
		return text.length > maxLength
			? text.slice(0, maxLength) + "..."
			: text;
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View style={styles.mainInputTagsView}>
				<TouchableOpacity
					onPress={() => {
						setTempSelected(selectedTags);
						setInputVisible((prev) => !prev);
					}}
					style={styles.mainInputTagsTouchableOpacity}
				>
					<Text
						style={{
							color: "#81818D",
							fontSize: 14,
							fontFamily: "GTWalsheimPro-Regular",
						}}
					>
						Оберіть теги
					</Text>
				</TouchableOpacity>

				{inputVisible && (
					<View style={styles.tagsView}>
						<TextInput
							value={searchTerm}
							onChangeText={setSearchTerm}
							placeholder="Пошук"
							style={styles.tagsInputSearch}
						/>

						<ScrollView
							showsVerticalScrollIndicator={true}
							style={{ maxHeight: 150, paddingHorizontal: 10 }}
							keyboardShouldPersistTaps="handled"
							nestedScrollEnabled={true}
							overScrollMode="never"
						>
							{filteredTags.map((tag) => {
								const isSelected = tempSelected.includes(
									tag.name
								);
								return (
									<TouchableOpacity
										key={tag.id}
										onPress={() => handleSelect(tag.name)}
										style={styles.tagsTouchableOpacity}
									>
										<Text
											style={{
												color: isSelected
													? "#9CA3AF"
													: "#070A1C",
												fontFamily:
													"GTWalsheimPro-Regular",
											}}
										>
											{tag.name}
										</Text>

										{isSelected && (
											<View style={{ marginLeft: 8 }}>
												<ICONS.CheckMarkIcon
													width={15}
													height={15}
												/>
											</View>
										)}
									</TouchableOpacity>
								);
							})}
						</ScrollView>

						<TouchableOpacity
							onPress={handleConfirm}
							style={styles.tagsConfirmButtonTouchableOpacity}
						>
							<Text
								style={{
									color: "#fff",
									textAlign: "center",
									fontFamily: "GTWalsheimPro-Regular",
								}}
							>
								Підтвердити
							</Text>
						</TouchableOpacity>
					</View>
				)}

				<View style={styles.selectedTagMainView}>
					{selectedTags.map((tagName) => {
						const tag = tags.find((t) => t.name === tagName);
						if (!tag) return null;
						return (
							<View key={tag.id} style={styles.selectedTagView}>
								<Text style={styles.selectedTagText}>
									{truncateText(tag.name)}
								</Text>
								<TouchableOpacity
									onPress={() => handleRemove(tag.name)}
									style={{ marginLeft: 16 }}
								>
									<View
										style={
											styles.selectedTagCloseButtonView
										}
									>
										<ICONS.CloseIcon
											color={"#FFFFFF"}
											width={10}
											height={10}
										/>
									</View>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
