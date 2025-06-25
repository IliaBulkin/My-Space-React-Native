import { TouchableOpacity, View, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./header-navigation-friends-page.styles";

export function HeaderNavigationFriendPages() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<View>
			<View style={styles.personalInfoSettingsTop}>
				<TouchableOpacity
					style={styles.personalInfoSettingsTopEl}
					onPress={() => router.replace("/friend-main")}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontWeight:
								pathname === "/friend-main" ? "700" : "400",
							borderBottomWidth:
								pathname === "/friend-main" ? 2 : 0,
						}}
					>
						Головна
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.personalInfoSettingsTopEl}
					onPress={() => router.replace("/friend-request")}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontWeight:
								pathname === "/friend-request" ? "700" : "400",
							borderBottomWidth:
								pathname === "/friend-request" ? 2 : 0,
						}}
					>
						Запити
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.personalInfoSettingsTopEl}
					onPress={() => router.replace("/friend-recommendation")}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontWeight:
								pathname === "/friend-recommendation"
									? "700"
									: "400",
							borderBottomWidth:
								pathname === "/friend-recommendation" ? 2 : 0,
						}}
					>
						Рекомендації
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.personalInfoSettingsTopEl}
					onPress={() => router.replace("/friend-all")}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontWeight:
								pathname === "/friend-all"
									? "700"
									: "400",
							borderBottomWidth:
								pathname === "/friend-all" ? 2 : 0,
						}}
					>
						Всі друзі
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
