import { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendRequest } from "../friend-component/friend-request-component";
import { HeaderNavigationFriendPages } from "../header-navigation-friends-page";
import { FriendCard } from "../../types/friend-info";
import { HOST, PORT } from "../../../../shared/base-url";

export function FriendRecommendationPage() {
	const [users, setUsers] = useState<FriendCard[]>([]);

	const fetchUsers = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(`http://${HOST}/friend/all-users`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		setUsers(data.users);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// useEffect(() => {
	// 	console.log(users[0]?.avatars);
	// }, [users]);

	return (
		<View style={{ flex: 1 }}>
			<HeaderNavigationFriendPages />
			{users && users.length === 0 ? (
				<Text
					style={{
						textAlign: "center",
						marginTop: 20,
						fontFamily: "GTWalsheimPro-Regular",
					}}
				>
					Недостатньо юзерів
				</Text>
			) : (
				<ScrollView
					contentContainerStyle={{ alignItems: "center" }}
					overScrollMode="never"
				>
					{users && users.map((user) => (
						<View
							key={user.id}
							style={{
								marginBottom: 10,
								width: "90%",
								alignItems: "center",
							}}
						>
							<FriendRequest.FriendSendRequest
								{...user}
								onRefresh={() => {fetchUsers()}}
							/>
						</View>
					))}
				</ScrollView>
			)}
		</View>
	);
}
