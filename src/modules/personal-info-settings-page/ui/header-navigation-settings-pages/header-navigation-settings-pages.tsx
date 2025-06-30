import { TouchableOpacity, View, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { styles } from "./header-navigation-settings-pages.styles";

export function HeaderNavigationSettingsPages() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<View>
			<View style={styles.personalInfoSettingsTop}>
				<TouchableOpacity
					style={styles.personalInfoSettingsTopEl}
					onPress={() => router.replace("/personal-info")}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontWeight: pathname === "/personal-info" ? "700" : "400",
							borderBottomWidth: pathname === "/personal-info" ? 2 : 0,
							borderBottomColor: "#543C52",
							color: "#070A1C"
						}}
					>
						Особиста інформація
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.personalInfoSettingsTopEl}
					onPress={() => router.replace("/albums")}
				>
					<Text
						style={{
							fontFamily: "GTWalsheimPro-Regular",
							fontWeight: pathname === "/albums" ? "700" : "400",
							borderBottomWidth: pathname === "/albums" ? 2 : 0,
							borderBottomColor: "#543C52",
							color: "#070A1C"
						}}
					>
						Альбоми
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
