import {
	ScrollView,
	TouchableOpacity,
	View,
	Text,
	Image,
	FlatList,
	TextInput,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./group-chat.styles";
import { MyMessage } from "../my-message/my-message";
import { AnotherUserMessage } from "../another-user-message/another-user-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AdminModal } from "../modals/ui/admin-modal/admin-modal";
import { RedactingGroupModal } from "../modals/ui/redacting-group-modal/redacting-group-modal";
import { AddingGroupModal } from "../modals/ui/adding-group-modal/adding-group-modal";
import { HTTPS_HOST } from "../../../../shared/base-url/base-url";
import { useAuthContext } from "../../../auth/context";
import { IMessageData } from "../messages/messages.types";
import { Card } from "../card/card";
import { useSocketContext } from "../../context/socket.context";
import { useForm } from "react-hook-form";
import { useCreateGroupChatContext } from "../../context/create-group-chat.context";
import { pickImage } from "../../../../shared/tools";

export function GroupChatPage() {
	const params = useLocalSearchParams<{
		chatId: string;
		avatar?: string;
		name: string;
		membersAmount: string;
		adminId: string;
	}>();

	const { getGroups } = useCreateGroupChatContext();

	const [chatInfo, setChatInfo] = useState<{
		name: string;
		avatar?: string;
		membersAmount: string;
	} | null>(null);

	const [isAdminModalVisible, setIsAdminModalVisible] = useState(false);
	const [isRedactingModalVisible, setIsRedactingModalVisible] =
		useState(false);
	const [isAddingModalVisible, setIsAddingModalVisible] = useState(false);
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { token, user } = useAuthContext();
	const { socket } = useSocketContext();

	const flatListRef = useRef<FlatList<IMessageData>>(null);

	const [value, setValue] = useState<string>("");
	const [attachedImage, setAttachedImage] = useState<string>("");

	const [chatMessages, setChatMessages] = useState<IMessageData[] | null>(
		null
	);

	function pickImageHandler() {
		async function pickImageAsync() {
			try {
				const image = await pickImage({
					allowsMultipleSelection: false,
					base64: true,
				});

				if (!image || !image[0].base64) return;

				let mimeType = image[0].mimeType;
				if (mimeType === "image/") {
					mimeType = "image/jpeg";
				}
				const base64WithPrefix = `data:${mimeType};base64,${image[0].base64}`;
				setAttachedImage(base64WithPrefix);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		pickImageAsync();
	}

	async function getChatMessages() {
		const response = await fetch(
			HTTPS_HOST + `/chat/all-messages/${params.chatId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		const result = await response.json();

		if (result.status === "success") {
			setChatMessages(result.messages);
		} else {
			alert("Помилка завантаження чату");
		}
	}

	useEffect(() => {
		socket?.on("newMessage", (data) => {
			setChatMessages((prevMessages) =>
				prevMessages ? [...prevMessages, data.message] : [data.message]
			);
		});

		socket?.emit("joinChat", { chatId: params.chatId });
		getChatMessages();
		return () => {
			socket?.emit("leaveChat", { chatId: Number(params.chatId) });
			socket?.off("newMessage");
		};
	}, []);

	useEffect(() => {
		if (!chatMessages || chatMessages.length === 0) return;

		flatListRef.current?.scrollToEnd({ animated: true });
	}, [chatMessages]);

	useEffect(() => {
		setChatInfo({
			name: params.name,
			avatar: params.avatar,
			membersAmount: params.membersAmount,
		});
	}, [params.name, params.avatar, params.membersAmount]);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={insets.top + 56}
		>
			<View style={[styles.container]}>
				<View style={styles.header}>
					<View
						style={{
							gap: 24,
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => {
								router.replace("/group-chats");
							}}
						>
							<ICONS.ReturnIcon width={15} height={15} />
						</TouchableOpacity>
						{chatInfo?.avatar ? (
							<Image
								source={{
									uri:
										HTTPS_HOST +
										"/media/" +
										chatInfo?.avatar,
								}}
								style={{
									width: 50,
									height: 50,
									borderRadius: 50,
								}}
							></Image>
						) : (
							<ICONS.ChatDefaultLogoIcon width={50} height={50} />
						)}

						<View>
							<Text
								style={{
									fontWeight: 500,
									fontSize: 24,
								}}
							>
								{chatInfo?.name}
							</Text>
							<Text
								style={{
									fontSize: 14,
									color: "#81818D",
								}}
							>
								{chatInfo?.membersAmount} учасник(и)
							</Text>
						</View>
					</View>
					{Number(params.adminId) === user?.profile?.id ? (
						<>
							<TouchableOpacity
								onPress={() => {
									setIsAdminModalVisible(true);
								}}
							>
								<ICONS.DotsIcon></ICONS.DotsIcon>
							</TouchableOpacity>
							<AdminModal
								visible={isAdminModalVisible}
								onClose={() => setIsAdminModalVisible(false)}
								onNext={() => {
									setIsAdminModalVisible(false);
									setIsRedactingModalVisible(true);
								}}
								id={+params.chatId}
								onRefresh={getGroups}
							/>
						</>
					) : null}

					<RedactingGroupModal
						visible={isRedactingModalVisible}
						onClose={() => setIsRedactingModalVisible(false)}
						onBack={() => {
							setIsRedactingModalVisible(false);
							setIsAdminModalVisible(true);
						}}
						onAdd={() => {
							setIsRedactingModalVisible(false);
							setIsAddingModalVisible(true);
						}}
						id={+params.chatId}
						onRefresh={setChatInfo}
					/>
					<AddingGroupModal
						visible={isAddingModalVisible}
						onClose={() => setIsAddingModalVisible(false)}
						onNext={() => {
							setIsAddingModalVisible(false);
							setIsRedactingModalVisible(true);
						}}
					/>
				</View>

				<View
					style={{
						justifyContent: "space-between",
						flex: 1,
					}}
				>
					<FlatList
						overScrollMode="never"
						snapToAlignment="end"
						ref={flatListRef}
						onContentSizeChange={() =>
							flatListRef.current?.scrollToEnd({
								animated: true,
							})
						}
						onLayout={() =>
							flatListRef.current?.scrollToEnd({
								animated: true,
							})
						}
						contentContainerStyle={{ paddingVertical: 16 }}
						data={chatMessages}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => {
							return item.author.user.id === user?.id ? (
								<MyMessage
									text={item.content}
									date={item.sent_at}
									wasWatched={true}
									attachedImage={item.attached_image}
								/>
							) : (
								<AnotherUserMessage
									image={item.author.avatars[0]?.image}
									name={item.author.user.first_name}
									surname={item.author.user.last_name}
									text={item.content}
									date={item.sent_at}
									wasWatched={true}
									attachedImage={item.attached_image}
								/>
							);
						}}
					/>
					<View
						style={{
							flexDirection: "row",
							alignItems: "flex-end",
							justifyContent: "space-between",
							gap: 24,
							paddingTop: 16,
						}}
					>
						<View style={{ flex: 1, gap: 10 }}>
							{attachedImage ? (
								<View
									style={{
										position: "relative",
										width: 150,
										height: 150,
										borderRadius: 25,
									}}
								>
									<Image
										source={{
											uri: attachedImage,
										}}
										style={{
											width: 150,
											height: 150,
											borderRadius: 25,
										}}
									/>
									<TouchableOpacity
										style={{
											borderRadius: 50,
											borderWidth: 1,
											borderColor: "#543C52",
											padding: 10,
											position: "absolute",
											bottom: 10,
											right: 10,
											backgroundColor: "white",
										}}
										onPress={() => {
											setAttachedImage("");
										}}
									>
										<ICONS.TrashCanIcon
											width={21}
											height={20}
										/>
									</TouchableOpacity>
								</View>
							) : null}

							<TextInput
								placeholder="Повідомлення"
								onChangeText={(text) => {
									setValue(text);
								}}
								style={{
									borderWidth: 1,
									borderColor: "#CDCED2",
									borderRadius: 10,
									// flex: 1,
									// flexShrink: 1,
									height: 42,
									padding: 10,
									paddingLeft: 16,
								}}
								value={value}
							/>
						</View>

						<TouchableOpacity
							style={{
								borderWidth: 1,
								borderRadius: 50,
								padding: 10,
								borderColor: "#543C52",
							}}
							onPress={pickImageHandler}
						>
							<ICONS.ImageIcon />
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								borderWidth: 1,
								borderRadius: 50,
								padding: 10,
								borderColor: "#543C52",
								backgroundColor: "#543C52",
							}}
							onPress={() => {
								socket?.emit("sendMessage", {
									message: value,
									chatId: Number(params.chatId),
									attachedImage: attachedImage,
								});
								setValue("");
								setAttachedImage("");
								Keyboard.dismiss();
							}}
						>
							<ICONS.PaperPlaneIcon width={21} height={20} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
