import {
	Modal,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
	TextInput,
} from "react-native";
import { IContactCard } from "../../../../types/chat-info";
import { useState } from "react";
import { styles } from "./new-group-modal-two.styles";
import { ICONS } from "../../../../../../shared/ui/icons";
import { Card } from "../../../card/card";
import { FriendCard } from "../../../../../friends-page/types/friend-info";
import { pickImage } from "../../../../../../shared/tools";
import { HTTPS_HOST } from "../../../../../../shared/base-url/base-url";
import { useAuthContext } from "../../../../../auth/context";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../../../../shared/ui/input";
import { useCreateGroupChatContext } from "../../../../context/create-group-chat.context";
import { getInfoAsync } from "expo-file-system";


export function NewGroupModalTwo({
	visible,
	onClose,
	onBack,
	onRefresh,
}: {
	visible: boolean;
	onClose: () => void;
	onBack: () => void;
	onRefresh: () => void;
}) {
	const { token } = useAuthContext();

	const {
		setSelectedFriends,
		selectedFriends,
		setAvatar,
		avatar,
		totalSelected,
		setTotalSelected,
		setValue,
		handleSubmit,
		control,
	} = useCreateGroupChatContext();

	function pickImageHandler() {
		async function pickImageAsync() {
			try {
				const image = await pickImage({
					allowsMultipleSelection: false,
					base64: true,
					
				});

				if (!image || !image[0].base64) return;

				let mimeType = image[0].mimeType
				if (mimeType === "image/") {
					mimeType = "image/jpeg"
				}
				const base64WithPrefix = `data:${mimeType};base64,${image[0].base64}`;
				setAvatar(base64WithPrefix);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		pickImageAsync();
	}

	async function sendRequest(data: { name: string }) {
		console.log(HTTPS_HOST + "/chat/create-group-chat");
		const response = await fetch(HTTPS_HOST + "/chat/create-group-chat", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data.name,
				avatar: avatar,
				participants: selectedFriends.map((friend) => {
					return friend.id;
				}),
			}),
		});
		const result = await response.json();
		onClose();
		setSelectedFriends([]);
		setTotalSelected(0);
		setAvatar("");
		setValue("name", "");
		onRefresh();
	}

	return (
		<Modal visible={visible} transparent={true} animationType="slide">
			<View style={styles.main}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={() => {
							onClose();
							setSelectedFriends([]);
							setTotalSelected(0);
							setAvatar("");
							setValue("name", "");
						}}
						style={{ alignSelf: "flex-end" }}
					>
						<ICONS.CloseIcon width={20} height={20} />
					</TouchableOpacity>
					<Text style={styles.topText}>Нова група</Text>
					<View style={{ gap: 6 }}>
						<Text>Назва</Text>

						<Controller
							control={control}
							name="name"
							render={({ field, fieldState }) => {
								return (
									<Input
										onChange={field.onChange}
										onChangeText={field.onChange}
										value={field.value}
										placeholder="Введіть назву"
										height={42}
									/>
								);
							}}
						/>
					</View>

					<View style={{ gap: 12, alignItems: "center" }}>
						{avatar === "" ? (
							<ICONS.ChatDefaultLogoIcon />
						) : (
							<Image
								style={{
									width: 75,
									height: 75,
									borderRadius: 50,
									alignSelf: "center",
								}}
								source={{
									uri: avatar,
								}}
							/>
						)}
						<View style={{ flexDirection: "row", gap: 24 }}>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								}}
								onPress={() => {
									pickImageHandler();
								}}
							>
								<ICONS.PlusWithoutBorder
									width={15}
									height={15}
								></ICONS.PlusWithoutBorder>
								<Text style={styles.text}>Додайте фото</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								}}
								onPress={() => {
									setAvatar("");
								}}
							>
								<ICONS.TrashCanIcon
									width={15}
									height={15}
								></ICONS.TrashCanIcon>
								<Text style={styles.text}>Видалити фото</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.participants}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text>Учасники</Text>
						</View>

						<FlatList
							overScrollMode="never"
							data={selectedFriends}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item }) => (
								<Card.GroupDelete
									friend={item}
									totalSelected={totalSelected}
									setTotalSelected={setTotalSelected}
									selectedFriends={selectedFriends}
									setSelectedFriends={setSelectedFriends}
								/>
							)}
						/>
					</View>
					<View style={styles.bottom}>
						<TouchableOpacity style={styles.butt1} onPress={onBack}>
							<Text style={{ color: "#543C52", fontWeight: 400 }}>
								Назад
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.butt2}
							onPress={() => {
								handleSubmit(sendRequest)();
							}}
						>
							<Text style={{ color: "#FFFFFF" }}>
								Створити групу
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
