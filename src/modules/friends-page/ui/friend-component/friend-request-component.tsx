import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FriendCard } from "../../types/friend-info";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./friend-request-component.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function FriendRequest({
	id,
	image,
	name,
	surname,
	username,
	onAccept,
	onReject,
}: FriendCard & {
	onAccept: () => void;
	onReject: () => void;
}) {
	return (
		<View style={styles.friendCard}>
			<View>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{ width: 96, height: 96, borderRadius: 20 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={96} height={96} />
				)}
			</View>
			<View
				style={[
					styles.userInfo,
					{ alignItems: "center", paddingTop: 10 },
				]}
			>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
							fontWeight: "700",
						}}
					>
						{name} {surname}
					</Text>
					<Text
						style={{
							fontSize: 14,
							paddingTop: 10,
							paddingBottom: 16,
							fontWeight: "500",
						}}
					>
						@{username}
					</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#543C52" }]}
					onPress={onAccept}
				>
					<Text
						style={{
							color: "#FFFFFF",
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 14,
						}}
					>
						Підтвердити
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						{
							borderWidth: 1,
							borderColor: "#543C52",
							backgroundColor: "white",
						},
					]}
					onPress={onReject}
				>
					<Text>Видалити</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function FriendSendRequest({
	id,
	image,
	name,
	surname,
	username,
	onReject,
}: FriendCard & { onReject?: () => void }) {
	const sendRequest = async () => {
		const token = await AsyncStorage.getItem("token");
		try {
			const res = await fetch(
				"http://192.168.3.11:3011/friend/send-friend-request",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ toUser: Number(id) }),
				}
			);
			if (res.ok) alert("Request send");
			else alert("Request send error");
		} catch {
			alert("Network error");
		}
	};

	return (
		<View style={styles.friendCard}>
			<View>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{ width: 96, height: 96, borderRadius: 20 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={96} height={96} />
				)}
			</View>
			<View
				style={[
					styles.userInfo,
					{ alignItems: "center", paddingTop: 10 },
				]}
			>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
							fontWeight: "700",
						}}
					>
						{name} {surname}
					</Text>
					<Text
						style={{
							fontSize: 14,
							paddingTop: 10,
							paddingBottom: 16,
							fontWeight: "500",
						}}
					>
						@{username}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: "#543C52" }]}
					onPress={sendRequest}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 14,
						}}
					>
						Додати
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						{
							borderWidth: 1,
							borderColor: "#543C52",
							backgroundColor: "white",
						},
					]}
					onPress={onReject}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 14,
						}}
					>
						Видалити
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function FriendItem({ id, image, name, surname, username }: FriendCard) {
	const handleDelete = async () => {
		try {
			const token = await AsyncStorage.getItem("token");
			if (!token) return;

			const res = await fetch("http://192.168.3.11:3011/friend/delete-friend", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ friendId: id }),
			});

			const data = await res.json();

			if (data.status === "success") {
				alert("Успіх! Друг видалений");
			} else {
				alert("Помилка! Щось пішло не так");
			}
		} catch (e) {
			console.error("Error deleting friend", e);
			alert("Помилка! Не вдалося видалити друга");
		}
	};

	return (
		<View style={styles.friendCard}>
			<View>
				{image ? (
					<Image
						source={{ uri: image }}
						style={{ width: 96, height: 96, borderRadius: 20 }}
					/>
				) : (
					<ICONS.AnonymousLogoIcon width={96} height={96} />
				)}
			</View>
			<View
				style={[
					styles.userInfo,
					{ alignItems: "center", paddingTop: 10 },
				]}
			>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontSize: 24,
							fontWeight: "700",
						}}
					>
						{name} {surname}
					</Text>
					<Text
						style={{
							fontSize: 14,
							paddingTop: 10,
							paddingBottom: 16,
							fontWeight: "500",
						}}
					>
						@{username}
					</Text>
				</View>
			</View>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<TouchableOpacity
					style={[
						styles.button,
						{
							backgroundColor: "#543C52",
							padding: 10,
							borderRadius: 20,
							justifyContent: "center",
							alignItems: "center",
						},
					]}
				>
					<Text style={{ color: "#fff", fontWeight: "600" }}>
						Повідомлення
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleDelete}
					style={[
						styles.button,
						{
							borderWidth: 1,
							borderColor: "#543C52",
							backgroundColor: "white",
						},
					]}
				>
					<Text>Видалити</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}


FriendRequest.FriendSendRequest = FriendSendRequest;
FriendRequest.FriendItem = FriendItem;
