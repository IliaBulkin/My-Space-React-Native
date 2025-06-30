import { TouchableOpacity, View, Text, Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { ModalTool } from "../../../../shared/modal";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../shared/ui/input";
import { TagsCustomInput } from "../tags-custom-input";
import { ICONS } from "../../../../shared/ui/icons";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useModal } from "../../../../modules/auth/context";
import { IUserPost } from "../../../../modules/auth/types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { styles } from "./modal-publication-post.styles";
import { TagsMultiSelect } from "../tags-multi-select";
import { COLORS } from "../../../../shared/constants";
import { LinksInput } from "../links-input";

interface ModalPublicationPostProps {
	onRefresh?: () => void;
}

export function ModalPublicationPost({ onRefresh }: ModalPublicationPostProps) {
	const { isCreateVisible, closeCreateModal } = useModal();

	const [images, setImages] = useState<string[]>([]);
	const [globalError, setGlobalError] = useState<string>("");

	const [posts, setPosts] = useState<IUserPost[]>([]);

	const {
		createPost,
		updatePost,
		deletePost,
		getAllPosts,
		getPostsByUserId,
		getAllTags,
	} = usePost();

	const schema = yup.object().shape({
		title: yup.string().required("Це поле обов'язкове"),
		content: yup.string().required("Це поле обов'язкове"),
		images: yup.array().required("Додайте хоча б одне зображення"),
		existingTags: yup.array().required("Додайте хоча б дефолтний один тег"),
		newTags: yup.array().required("Додайте хоча б кастомний один тег"),
		link: yup.array().required("Додайте хочаб одне посилання"),
	});

	const { handleSubmit, control, formState, setValue, setError } =
		useForm<IUserPost>({
			defaultValues: {
				title: "",
				content: "",
				images: [],
				existingTags: [],
				newTags: [],
				link: [],
			},
			resolver: yupResolver(schema),
		});

	const shouldAddMarginBottom =
		images.length >= 4 ||
		control._formValues.defaultTags?.length > 0 ||
		control._formValues.customTags?.length > 0;

	async function closingModal() {
		closeCreateModal();
		setValue("title", "");
		setValue("content", "");
		setImages([]);
		setValue("images", []);
		setValue("existingTags", []);
		setValue("newTags", []);
		setValue("link", []);
	}

	function removeImage(index: number) {
		const updatedImages = images.filter((_, i) => i !== index);
		setImages(updatedImages);
		setValue("images", updatedImages);
	}

	// async function onSearch() {
	// 	const result = await requestMediaLibraryPermissionsAsync();

	// 	if (result.status === "granted") {
	// 		const selected = await launchImageLibraryAsync({
	// 			mediaTypes: "images",
	// 			allowsMultipleSelection: true,
	// 			selectionLimit: 9,
	// 			base64: true,
	// 		});

	// 		if (selected.assets) {
	// 			const bases64 = selected.assets
	// 				.map((asset) => asset.base64)
	// 				.filter(
	// 					(base64): base64 is string => typeof base64 === "string"
	// 				);

	// 			if (bases64.length === 0) {
	// 				return 0;
	// 			}

	// 			setImages(bases64);
	// 			setValue("images", bases64);
	// 		}
	// 	}
	// }
	async function onSearch() {
		try {
			const result = await requestMediaLibraryPermissionsAsync();

			if (result.status !== "granted") return;

			const selected = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsMultipleSelection: true,
				selectionLimit: 9,
				base64: true,
			});

			if (!selected.assets) return;

			const base64WithMime = selected.assets
				.map((asset) => {
					if (!asset.base64) return null;

					let mimeType = asset.mimeType;

					// fallback if mimeType is missing or "image/"
					if (mimeType === "image/") {
						mimeType = "image/jpeg"
					}

					return `data:${mimeType};base64,${asset.base64}`;
				})
				.filter(
					(base64): base64 is string => typeof base64 === "string"
				);

			if (base64WithMime.length === 0) return;

			setImages([...images, ...base64WithMime]);
			setValue("images", [...images, ...base64WithMime]);
		} catch (error) {
			console.log((error as Error).message);
		}
	}

	useEffect(() => {
		images.forEach((image) => {
			console.log(image.slice(0, 25))
		})
	}, [images])

	function onSubmit(data: IUserPost) {

		async function request() {
			const response = await createPost(data);
			onRefresh?.();
			closingModal();
		}

		request();
	}

	return (
		<View>
			<ModalTool isVisible={isCreateVisible} onClose={closingModal}>
				<ScrollView
					style={styles.mainModalWindow}
					overScrollMode="never"
					contentContainerStyle={{
						paddingBottom: images.length > 0 ? 44 : 0,
					}}
				>
					<View style={styles.closeModalButton}>
						<TouchableOpacity onPress={closingModal}>
							<ICONS.CloseIcon width={15} height={15} />
						</TouchableOpacity>
					</View>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
						}}
					>
						Створення публікації
					</Text>
					<View style={styles.mainModalInputsFrame}>
						<View style={styles.themeModalInputFrame}>
							<Text
								style={{
									fontFamily: "GTWalsheimPro-Regular",
									fontSize: 16,
								}}
							>
								Тема публікації
							</Text>
							<Controller
								control={control}
								name="title"
								render={({ field, fieldState }) => {
									return (
										<Input
											placeholder="Напишіть тему публікації"
											onChange={field.onChange}
											onChangeText={field.onChange}
											value={field.value}
											autoCorrect={false}
											errorMessage={
												fieldState.error?.message
											}
										/>
									);
								}}
							/>
							<Controller
								control={control}
								name="content"
								render={({ field, fieldState }) => {
									return (
										<Input
											height={140}
											placeholder="Напишіть опис до публікації"
											onChange={field.onChange}
											onChangeText={field.onChange}
											value={field.value}
											autoCorrect={false}
											multiline={true}
											isTextArea={true}
											errorMessage={
												fieldState.error?.message
											}
										/>
									);
								}}
							/>
						</View>

						<View style={{ marginTop: 16 }}>
							<Controller
								control={control}
								name="existingTags"
								render={({ field }) => (
									<TagsMultiSelect
										selectedTags={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
						</View>

						<View>
							<Controller
								control={control}
								name="newTags"
								render={({ field }) => (
									<TagsCustomInput
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
						</View>
					</View>

					<View style={styles.themeModalInputFrame}>
						<Text
							style={{
								fontFamily: "GTWalsheimPro-Regular",
								fontSize: 16,
							}}
						>
							Посилання
						</Text>
						<Controller
							control={control}
							name="link"
							render={({ field }) => (
								<LinksInput
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</View>

					{images.length > 0 && (
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 16,
								marginBottom: 15,
								marginTop: 15,
							}}
						>
							{images.map((uri, index) => (
								<View
									key={index}
									style={{
										position: "relative",
										alignItems: "flex-end",
									}}
								>
									<Image
										source={{
											uri:
												uri,
										}}
										style={{
											width: 100,
											height: 100,
											borderRadius: 15,
										}}
										resizeMode="cover"
									/>
									<TouchableOpacity
										onPress={() => removeImage(index)}
										style={styles.imageDeleteButton}
									>
										<ICONS.TrashCanIcon
											width={20}
											height={20}
											color={"#543C52"}
										/>
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							gap: 10,
							width: 343,
							height: 40,
							marginTop: images.length >= 1 ? 0 : 20,
							marginBottom: shouldAddMarginBottom ? 40 : 10,
						}}
					>
						<TouchableOpacity onPress={onSearch}>
							<ICONS.ImageWithStylesIcon />
						</TouchableOpacity>
						{/* <TouchableOpacity>
							<ICONS.EmojiWithStylesIcon />
						</TouchableOpacity> */}
						<TouchableOpacity onPress={handleSubmit(onSubmit)}>
							<View style={styles.sendPostModalButton}>
								<Text
									style={{
										fontFamily: "GTWalsheimPro-Regular",
										fontSize: 14,
										color: COLORS.WHITE,
									}}
								>
									Публікація
								</Text>
								<ICONS.SendPostIcon width={16} height={18} />
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</ModalTool>
		</View>
	);
}
