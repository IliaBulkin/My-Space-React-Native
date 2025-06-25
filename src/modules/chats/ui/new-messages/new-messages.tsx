import { View, Text } from "react-native";

export function NewMessages() {
	return (
		<View
			style={{
				flexDirection: "row",
                alignSelf: "center",
                gap: 16,
                alignItems: "center"
			}}
		>
			<View style={{ borderColor: "#E2E0E8", borderWidth: 1, width: "100%", maxHeight: 0 }}></View>
			<Text style={{ color: "#81818D", fontSize: 16 }}>
				Нові повідомлення
			</Text>
			<View style={{ borderColor: "#E2E0E8", borderWidth: 1, width: "100%", maxHeight: 0  }}></View>
		</View>
	);
}
