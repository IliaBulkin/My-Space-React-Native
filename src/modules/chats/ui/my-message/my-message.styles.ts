import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		borderRadius: 6,
		padding: 10,
		gap: 4,
		backgroundColor: "#CDCED2",
		alignSelf: "flex-end",
		alignItems: "flex-end",
		maxWidth: "95%",
		flexDirection: "column",
		marginBottom: 10,
	},
	messageText: {
		color: "#070A1C",
	},
	infoCont: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
	},
});
