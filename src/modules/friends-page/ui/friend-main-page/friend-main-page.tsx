import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequest } from "../friend-component/friend-request-component";
import { FriendCard, FriendRequestType } from "../../types/friend-info";
import { styles } from "./friend-main-page.styles";
import { HOST, PORT } from "../../../../shared/base-url";
import { useRouter } from "expo-router";

export function FriendMainPage() {
	const [requests, setRequests] = useState<FriendRequestType[]>([]);
	const [recommendations, setRecommendations] = useState<FriendCard[]>([]);
	const [friends, setFriends] = useState<FriendCard[]>([]);

	const router = useRouter()

	const loadData = async () => {
		const token = await AsyncStorage.getItem("token");

		const [requestsRes, usersRes, friendsRes] = await Promise.all([
			fetch(`http://${HOST}/friend/pending-requests`, {
				headers: { Authorization: `Bearer ${token}` },
			}),
			fetch(`http://${HOST}/friend/all-users`, {
				headers: { Authorization: `Bearer ${token}` },
			}),
			fetch(`http://${HOST}/friend/all-friends`, {
				headers: { Authorization: `Bearer ${token}` },
			}),
		]);

		const requestsJson = await requestsRes.json();
		const usersJson = await usersRes.json();
		const friendsJson = await friendsRes.json();

		// const filteredRequests = (
		// 	requestsJson.requests as FriendRequestType[]
		// ).filter((r) => !r.isAccepted);

		setRequests(requestsJson.requests.slice(0, 2));
		setRecommendations(usersJson.users.slice(0, 2));
		setFriends(friendsJson.friends.slice(0, 2));
	};

	// useEffect(() => {
	// 	console.log(friends)
	// }, [friends])

	const respondRequest = async (id: number, accept: boolean) => {
		const token = await AsyncStorage.getItem("token");
		const url = accept
			? `http://${HOST}/friend/accept-request`
			: `http://${HOST}/friend/reject-request`;

		await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ requestId: id }),
		});
		loadData();
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<ScrollView overScrollMode="never">
			<HeaderNavigationFriendPages />

			<View style={styles.mainBlockView}>
				<View style={styles.mainNavigationView}>
					<Text
						style={[
							styles.mainNavigationText,
							{ color: "#070A1C" },
						]}
					>
						Запити
					</Text>
					<TouchableOpacity onPress={() => {router.replace("/friend-request/")}}>
						<Text
							style={[
								styles.mainNavigationText,
								{ color: "#543C52" },
							]}
						>
							Дивитись всі
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%", alignItems: "center" }}>
					{requests.length > 0 ? (
						requests.map((item) => {
							return (
								<View
									style={{
										width: "100%",
										alignItems: "center",
										marginBottom: 10,
									}}
									key={item.id.toString()}
								>
									<FriendRequest
										{...item}
										onAccept={() =>
											respondRequest(item.id, true)
										}
										onReject={() =>
											respondRequest(item.id, false)
										}
									/>
								</View>
							);
						})
					) : (
						<Text
							style={[
								styles.mainNavigationText,
								{ margin: 16, color: "#070A1C" },
							]}
						>
							У вас немає запитів
						</Text>
					)}
				</View>
			</View>

			<View style={styles.mainBlockView}>
				<View style={styles.mainNavigationView}>
					<Text
						style={[
							styles.mainNavigationText,
							{ color: "#070A1C" },
						]}
					>
						Рекомендації
					</Text>
					<TouchableOpacity onPress={() => {router.replace("/friend-recommendation/")}}>
						<Text
							style={[
								styles.mainNavigationText,
								{ color: "#543C52" },
							]}
						>
							Дивитись всі
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%", alignItems: "center" }}>
					{recommendations.length > 0 ? (
						recommendations.map((user) => (
							<View
								style={{
									width: "100%",
									alignItems: "center",
									marginBottom: 10,
								}}
									key={user.id}
							>
								<FriendRequest.FriendSendRequest
									{...user}
									onRefresh={loadData}
								/>
							</View>
						))
					) : (
						<Text
							style={[
								styles.mainNavigationText,
								{ margin: 16, color: "#070A1C" },
							]}
						>
							Недостатньо юзерів
						</Text>
					)}
				</View>
			</View>

			<View style={styles.mainBlockView}>
				<View style={styles.mainNavigationView}>
					<Text
						style={[
							styles.mainNavigationText,
							{ color: "#070A1C" },
						]}
					>
						Всі друзі
					</Text>
					<TouchableOpacity onPress={() => {router.replace("/friend-all/")}}>
						<Text
							style={[
								styles.mainNavigationText,
								{ color: "#543C52" },
							]}
						>
							Дивитись всі
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ width: "100%", alignItems: "center" }}>
					{friends.length > 0 ? (
						friends.map((friend) => (
							<View
								style={{
									width: "100%",
									alignItems: "center",
									marginBottom: 10,
								}}
								key={friend.id}
							>
								<FriendRequest.FriendItem
									{...friend}
									onRefresh={loadData}
								/>
							</View>
						))
					) : (
						<Text
							style={[
								styles.mainNavigationText,
								{ margin: 16, color: "#070A1C" },
							]}
						>
							У вас немає друзів
						</Text>
					)}
				</View>
			</View>
		</ScrollView>
	);
}
