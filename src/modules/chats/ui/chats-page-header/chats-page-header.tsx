import { View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { styles } from "./chats-page-header.styles";
import { useRouter } from "expo-router";

export function ChatsPageHeader() {
	const router = useRouter();
	return (
		<View style={styles.main}>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					router.replace("/contacts");
				}}
			>
				<ICONS.FriendsIcon width={20} height={20} />
				<Text style={styles.text}>Контакти</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					router.replace("/messages");
				}}
			>
				<ICONS.ChatIcon width={20} height={20} />
				<Text style={styles.text}>Повідомлення</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					router.replace("/group-chats");
				}}
			>
				<ICONS.ChatIcon width={20} height={20} />
				<Text style={styles.text}>Групові чати</Text>
			</TouchableOpacity>
		</View>
	);
}
