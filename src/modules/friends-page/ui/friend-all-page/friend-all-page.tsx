import { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendRequest } from "../friend-component/friend-request-component";
import { FriendCard } from "../../types/friend-info";

// interface Friend {
// 	id: string;
// 	name: string;
// 	surname: string ;
// 	username: string ;
// 	image: string;
// }

export function FriendAllPage() {
	const [friends, setFriends] = useState<FriendCard[]>([]);

	const fetchFriends = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch("http://192.168.3.11:3011/friend/all-friends", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		setFriends(data.friends);
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<HeaderNavigationFriendPages />
			{friends.length === 0 ? (
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
					}}
					overScrollMode="never"
				>
					{friends.map((friend) => (
						<FriendRequest.FriendItem
							key={friend.id}
							id={friend.id}
							name={friend.name}
							surname={friend.surname}
							username={friend.username}
							image={friend.image}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
}
