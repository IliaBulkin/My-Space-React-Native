import { View, Text, FlatList } from "react-native";
import { styles } from "./contacts.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { IContactCard } from "../../types/chat-info";
import { Card } from "../card/card";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FriendCard } from "../../../friends-page/types/friend-info";
import { HOST } from "../../../../shared/base-url";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export function ContactsPage() {

	const insets = useSafeAreaInsets();

	const [friends, setFriends] = useState<FriendCard[]>([]);

	const fetchFriends = async () => {
		const token = await AsyncStorage.getItem("token");
		const res = await fetch(`http://${HOST}/friend/all-friends`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await res.json();
		setFriends(data.friends);
	};

	useEffect(() => {
		fetchFriends();
	}, []);

	// useEffect(() => {
	// 	console.log(friends[0].avatars[0].image)
	// }, [friends])

	return (
		<View style={styles.container}>
			<FlatList
				data={friends}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => <Card.Contact image={item.avatars[0]?.image} name={item.user.first_name} surname={item.user.last_name}/>}
				ListHeaderComponent={
					<View>
						<View style={styles.contactsTop}>
							<ICONS.FriendsIcon
								fill={"#81818D"}
								width={20}
								height={20}
							/>
							<Text
								style={{
									color: "#81818D",
									fontWeight: "500",
									fontSize: 20,
								}}
							>
								Контакти
							</Text>
						</View>
						<View style={styles.search}>
							<ICONS.SearchIcon
								width={15}
								height={15}
								fill={"#070A1C"}
							/>
							<Text
								style={{
									color: "#81818D",
									fontSize: 16,
								}}
							>
								Пошук
							</Text>
						</View>
					</View>
				}
				contentContainerStyle={{ height: "100%", paddingBottom: insets.bottom + 12}}
			/>
		</View>
	);
}
