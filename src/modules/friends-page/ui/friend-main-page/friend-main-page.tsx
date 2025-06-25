import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequest } from "../friend-component/friend-request-component";
import { FriendCard, FriendRequestType } from "../../types/friend-info";
import { styles } from "./friend-main-page.styles";

export function FriendMainPage() {
	const [requests, setRequests] = useState<FriendRequestType[]>([]);
	const [recommendations, setRecommendations] = useState<FriendCard[]>([]);
	const [friends, setFriends] = useState<FriendCard[]>([]);

	const loadData = async () => {
		const token = await AsyncStorage.getItem("token");

		const [requestsRes, usersRes, friendsRes] = await Promise.all([
			fetch("http://192.168.3.11:3011/friend/pending-requests", {
				headers: { Authorization: `Bearer ${token}` },
			}),
			fetch("http://192.168.3.11:3011/friend/all-users", {
				headers: { Authorization: `Bearer ${token}` },
			}),
			fetch("http://192.168.3.11:3011/friend/all-friends", {
				headers: { Authorization: `Bearer ${token}` },
			}),
		]);

		const requestsJson = await requestsRes.json();
		const usersJson = await usersRes.json();
		const friendsJson = await friendsRes.json();

		const filteredRequests = (
			requestsJson.requests as FriendRequestType[]
		).filter((r) => !r.isAccepted);

		setRequests(filteredRequests.slice(0, 2));
		setRecommendations(usersJson.users.slice(0, 2));
		setFriends(friendsJson.friends.slice(0, 2));
	};

	const respondRequest = async (id: number, accept: boolean) => {
		const token = await AsyncStorage.getItem("token");
		const url = accept
			? `http://192.168.3.11:3011/friend/accept-request`
			: `http://192.168.3.11:3011/friend/reject-request`;

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
					<TouchableOpacity>
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
							const user = item.fromUserDetails;
							if (!user) return null;
							return (
								<View
									style={{
										width: "100%",
										alignItems: "center",
										marginBottom: 10,
									}}
								>
									<FriendRequest
										key={item.id.toString()}
										id={user.id}
										image={user.image}
										name={user.name}
										surname={user.surname}
										username={user.username}
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
					<TouchableOpacity>
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
							>
								<FriendRequest.FriendSendRequest
									key={user.id}
									{...user}
									onReject={() =>
										setRecommendations((prev) =>
											prev.filter(
												(us) => us.id !== user.id
											)
										)
									}
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
					<TouchableOpacity>
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
							>
								<FriendRequest.FriendItem
									key={friend.id}
									{...friend}
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
