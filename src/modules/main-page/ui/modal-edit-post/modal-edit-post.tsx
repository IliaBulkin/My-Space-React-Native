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
import { styles } from "./modal-edit-post.styles";
import { TagsMultiSelect } from "../tags-multi-select";
import { COLORS } from "../../../../shared/constants";
import { useAuthContext } from "../../../auth/context";
import { LinksInput } from "../links-input";

interface Props {
	postId: number | null;
	onRefresh?: () => void;
}

export function ModalEditPost({ postId, onRefresh }: Props) {
	const { isEditVisible, closeEditModal, editPostId } = useModal();
	const { getPostById, updatePost } = usePost();
	const { user } = useAuthContext();

	const [images, setImages] = useState<string[]>([]);
	// const [postData, setPostData] = useState<IUserPost | null>(null);

	const { handleSubmit, control, setValue, reset } = useForm<IUserPost>({
		defaultValues: {
			name: "",
			description: "",
			image: [],
			defaultTags: [],
			customTags: [],
			link: [],
		},
	});

	useEffect(() => {
		if (!isEditVisible || editPostId === null) return;

		async function fetchData() {
			if (!user) return;
			if (editPostId == null) return;

			const response = await getPostById(editPostId);
			if (
				response.status === "error" ||
				response.status === "error-validation"
			)
				return;

			const post = response.data;
			if (!post) return;

			const formData: IUserPost = {
				name: post.title || "",
				description: post.text || "",
				defaultTags: post.tags || [],
				customTags: [],
				image: post.images || [],
				link: post.link || [],
			};

			// setPostData(formData);
			reset(formData);

			setImages(post.images || []);
		}

		fetchData();
	}, [isEditVisible, editPostId]);

	const shouldAddMarginBottom =
		images.length >= 4 ||
		control._formValues.defaultTags?.length > 0 ||
		control._formValues.customTags?.length > 0;

	function removeImage(index: number) {
		const updatedImages = images.filter((_, i) => i !== index);
		setImages(updatedImages);
		setValue("image", updatedImages);
	}

	async function onSearch() {
		const permission = await requestMediaLibraryPermissionsAsync();
		if (permission.status !== "granted") return;

		const selected = await launchImageLibraryAsync({
			mediaTypes: "images",
			allowsMultipleSelection: true,
			selectionLimit: 9,
			base64: true,
		});

		if (selected.assets && selected.assets.length > 0) {
			const bases64 = selected.assets
				.map((asset) => asset.base64)
				.filter((b): b is string => !!b);

			if (bases64.length === 0) return;

			const newImages = [...images, ...bases64].slice(0, 9);
			setImages(newImages);
			setValue("image", newImages);
		}
	}

	async function onSubmit(data: IUserPost) {
		if (editPostId == null) return;

		await updatePost(editPostId, {
			...data,
			image: images,
		});
		onRefresh?.();
		closeEditModal();
	}

	return (
		<View>
			<ModalTool isVisible={isEditVisible} onClose={closeEditModal}>
				<ScrollView
					style={styles.mainModalWindow}
					overScrollMode="never"
				>
					<View style={styles.closeModalButton}>
						<TouchableOpacity onPress={closeEditModal}>
							<ICONS.CloseIcon width={15} height={15} />
						</TouchableOpacity>
					</View>

					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
						}}
					>
						Редагувати публікацію
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
								name="name"
								render={({ field, fieldState }) => (
									<Input
										placeholder="Напишіть тему публікації"
										value={field.value}
										onChangeText={field.onChange}
										autoCorrect={false}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>

							<Controller
								control={control}
								name="description"
								render={({ field, fieldState }) => (
									<Input
										height={140}
										placeholder="Напишіть опис до публікації"
										value={field.value}
										onChangeText={field.onChange}
										autoCorrect={false}
										multiline={true}
										isTextArea={true}
										errorMessage={fieldState.error?.message}
									/>
								)}
							/>
						</View>

						<View style={{ marginTop: 16 }}>
							<Controller
								control={control}
								name="defaultTags"
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
								name="customTags"
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
								marginVertical: 15,
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
												"data:image/jpeg;base64," + uri,
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
						<TouchableOpacity>
							<ICONS.EmojiWithStylesIcon />
						</TouchableOpacity>
						<TouchableOpacity onPress={handleSubmit(onSubmit)}>
							<View style={styles.sendPostModalButton}>
								<Text
									style={{
										fontFamily: "GTWalsheimPro-Regular",
										fontSize: 14,
										color: COLORS.WHITE,
									}}
								>
									Редагувати
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
