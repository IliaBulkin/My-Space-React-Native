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

	const { handleSubmit, control, setValue, reset } = useForm<IUserPost>({
		defaultValues: {
			title: "",
			content: "",
			images: [],
			existingTags: [],
			newTags: [],
			link: [],
		},
	});

	useEffect(() => {
		if (!isEditVisible || editPostId === null) return;

		async function fetchBase64Images(urls: string[]) {
			const promises = urls.map(async (url) => {
				try {
					const encodedUrl = encodeURIComponent(url);
					const response = await fetch(
						`http://192.168.3.11:3011/post/get-base64-from-url/${encodedUrl}`
					);
					const data = await response.json();
					return data.base64 as string;
				} catch {
					return null;
				}
			});
			const results = await Promise.all(promises);
			return results.filter((x): x is string => !!x);
		}

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

			const base64Images = await fetchBase64Images(post.images || []);

			const formData: IUserPost = {
				title: post.title || "",
				content: post.content || "",
				existingTags: post.tags || [],
				newTags: [],
				images: base64Images,
				link: post.links || [],
			};

			reset(formData);

			setImages(base64Images);
		}

		fetchData();
	}, [isEditVisible, editPostId]);

	// useEffect(() => {
	// 	console.log(images.map((image) => {return image.slice(0, 15)}))
	// }, [images])
	const shouldAddMarginBottom =
		images.length >= 4 ||
		control._formValues.defaultTags?.length > 0 ||
		control._formValues.customTags?.length > 0;

	function removeImage(index: number) {
		const updatedImages = images.filter((_, i) => i !== index);
		setImages(updatedImages);
		setValue("images", updatedImages);
	}

	// async function onSearch() {
	// 	const permission = await requestMediaLibraryPermissionsAsync();
	// 	if (permission.status !== "granted") return;

	// 	const selected = await launchImageLibraryAsync({
	// 		mediaTypes: "images",
	// 		allowsMultipleSelection: true,
	// 		selectionLimit: 9,
	// 		base64: true,
	// 	});

	// 	if (selected.assets && selected.assets.length > 0) {
	// 		const bases64WithPrefix = selected.assets
	// 			.map((asset) => asset.base64)
	// 			.filter((b): b is string => !!b)
	// 			.map((base64) => `data:image/jpeg;base64,${base64}`);
	// 		if (bases64WithPrefix.length === 0) return;

	// 		const newImages = [...images, ...bases64WithPrefix].slice(0, 9);
	// 		setImages(newImages);
	// 		setValue("images", newImages);
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
						mimeType = "image/jpeg";
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



	async function onSubmit(data: IUserPost) {
		if (editPostId == null) return;

		// console.log(data);
		await updatePost(editPostId, { ...data, id: postId, images: images });
		onRefresh?.();
		closeEditModal();
	}

	return (
		<View>
			<ModalTool isVisible={isEditVisible} onClose={closeEditModal}>
				<ScrollView
					style={styles.mainModalWindow}
					overScrollMode="never"
					contentContainerStyle={{
						paddingBottom: images.length > 0 ? 44 : 0,
					}}
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
								name="title"
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
								name="content"
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
											uri: uri,
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
