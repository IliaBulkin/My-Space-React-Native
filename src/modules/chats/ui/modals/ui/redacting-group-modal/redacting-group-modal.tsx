import {
	Modal,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	Image,
} from "react-native";
import { IChatInfo, IContactCard } from "../../../../types/chat-info";
import { ICONS } from "../../../../../../shared/ui/icons";
import { Card } from "../../../card/card";
import { styles } from "./redacting-group-modal.styles";
import { useEffect, useState } from "react";
import { HOST } from "../../../../../../shared/base-url";
import { useAuthContext } from "../../../../../auth/context";
import { useUpdateGroupChatContext } from "../../../../context/update-group-chat.context";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Controller } from "react-hook-form";
import { Input } from "../../../../../../shared/ui/input";
import { pickImage } from "../../../../../../shared/tools";
import { HTTPS_HOST } from "../../../../../../shared/base-url/base-url";

export function RedactingGroupModal({
	visible,
	onClose,
	onBack,
	onAdd,
	id,
	onRefresh,
}: {
	visible: boolean;
	onClose: () => void;
	onBack: () => void;
	onAdd: () => void;
	id: number;
	onRefresh: ({
		name,
		avatar,
		membersAmount,
	}: {
		name: string;
		avatar?: string;
		membersAmount: string;
	}) => void;
}) {
	const [chatInfo, setChatInfo] = useState<IChatInfo | null>(null);
	const { token } = useAuthContext();

	const {
		selectedFriends,
		setSelectedFriends,
		avatar,
		setAvatar,
		totalSelected,
		setTotalSelected,
		handleSubmit,
		setValue,
		control,
	} = useUpdateGroupChatContext();

	const fetchChatInfo = async () => {
		const res = await fetch(`http://${HOST}/chat/chat-info/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		if (data.status === "success") {
			setChatInfo(data.chat);
		} else {
			alert("Помилка при отриманні чатів");
		}
	};

	const getBase64FromUrl = async (url: string) => {
		const encodedUrl = encodeURIComponent(url);
		const res = await fetch(
			`http://${HOST}/chat/get-base64-from-url/${encodedUrl}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const data = await res.json();
		if (data.status === "success") {
			setAvatar(data.data);
		} else {
			alert("Помилка при отриманні картинки");
		}
	};

	useEffect(() => {
		fetchChatInfo();
	}, []);


	useEffect(() => {
		if (!chatInfo) return;
		setValue("name", chatInfo.name);
		if (chatInfo.avatar) {
			console.log(chatInfo.avatar);
			getBase64FromUrl("/media/" + chatInfo.avatar);
		}
		setSelectedFriends(
			chatInfo.members.map((member) => ({
				id: member.profile_id,
				user: member.profile.user,
				avatars: member.profile.avatars,
			}))
		);

		setTotalSelected(chatInfo.members.length);
	}, [chatInfo]);

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
		const response = await fetch(HTTPS_HOST + "/chat/update-group-chat", {
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
				chatId: id,
			}),
		});
		const result = await response.json();

		if (result.status === "success") {
			onClose();
			// setSelectedFriends([]);
			// setTotalSelected(0);
			// setAvatar("");
			// setValue("name", "");
			onRefresh({
				name: result.chat.name,
				avatar: result.chat.avatar,
				membersAmount: String(totalSelected + 1),
			});
		}
	}

	return (
		<Modal visible={visible} transparent={true}>
			<View style={styles.main}>
				<View style={styles.container}>
					<TouchableOpacity
						onPress={onClose}
						style={{ alignSelf: "flex-end" }}
					>
						<ICONS.CloseIcon width={20} height={20} />
					</TouchableOpacity>
					<Text style={styles.topText}>Редагування групи</Text>
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
						{avatar !== "" ? (
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
						) : (
							<ICONS.ChatDefaultLogoIcon width={75} height={75} />
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
							<TouchableOpacity
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 8,
								}}
								onPress={onAdd}
							>
								<ICONS.PlusWithoutBorder
									width={15}
									height={15}
								></ICONS.PlusWithoutBorder>
								<Text>Додайте учасника</Text>
							</TouchableOpacity>
						</View>

						<FlatList
							overScrollMode="never"
							data={selectedFriends}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item }) => (
								<Card.GroupDelete
									friend={item}
									setSelectedFriends={setSelectedFriends}
									setTotalSelected={setTotalSelected}
									selectedFriends={selectedFriends}
									totalSelected={totalSelected}
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
								Зберегти зміни
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
