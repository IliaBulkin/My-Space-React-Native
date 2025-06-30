import { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequest } from "../friend-component/friend-request-component";
import { FriendCard } from "../../types/friend-info";
import { HOST, PORT } from "../../../../shared/base-url";

export function FriendAllPage() {
	const [friends, setFriends] = useState<FriendCard[]>([]);

	const fetchFriends = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(`http://${HOST}/friend/all-friends`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		setFriends(data.friends);
	};

	// useEffect(() => {
	// 	console.log(friends)
	// }, [friends])

	useEffect(() => {
		fetchFriends();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<HeaderNavigationFriendPages />
			{friends && friends.length === 0 ? (
				<Text
					style={{
						textAlign: "center",
						marginTop: 20,
						fontFamily: "GTWalsheimPro-Regular",
					}}
				>
					У Вас немає друзів
				</Text>
			) : (
				<ScrollView
					contentContainerStyle={{
						width: "95%",
						alignItems: "center",
						paddingLeft: 24,
						gap: 12
					}}
					overScrollMode="never"
				>
					{friends && friends.map((friend) => (
						<FriendRequest.FriendItem
							key={friend.id}
							{...friend}
							onRefresh={fetchFriends}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
}
