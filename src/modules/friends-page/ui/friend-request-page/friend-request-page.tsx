import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequestType } from "../../types/friend-info";
import { FriendRequest } from "../friend-component/friend-request-component";
import { HOST, PORT } from "../../../../shared/base-url";

export function FriendRequestPage() {
	const [requests, setRequests] = useState<FriendRequestType[]>([]);

	const loadRequests = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(`http://${HOST}/friend/pending-requests`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const json = await res.json();
		const requestsArray = json.requests as FriendRequestType[];
		setRequests(requestsArray);
		// console.log("request", json);
	};

	// useEffect(() => {
	// 	console.log("state", requests && requests);
	// }, [requests]);

	useEffect(() => {
		loadRequests();
	}, []);

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
		loadRequests();
	};


	return (
		<View style={{ flex: 1 }}>
			<HeaderNavigationFriendPages />
			{requests.length === 0 ? (
				<Text
					style={{
						textAlign: "center",
						marginTop: 20,
						fontFamily: "GTWalsheimPro-Regular",
					}}
				>
					Немає вхідних запитів
				</Text>
			) : (

				<FlatList
					data={requests}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={{
						paddingLeft: 20,
						gap: 16,
					}}
					style={{ width: "95%" }}
					renderItem={({ item }) => {
						return (
							<FriendRequest
								{...item}
								onAccept={() => {respondRequest(item.id, true)}}
								onReject={() => {respondRequest(item.id, false)}}
							/>
						);
					}}
				/>
			)}
		</View>
	);
}
