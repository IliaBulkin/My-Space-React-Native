import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card1: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		paddingBottom: 16,
	},
	contactImage: {
		height: 50,
		width: 50,
		borderRadius: 50
	},
	contactName: {
		color: "#070A1C",
		fontSize: 16,
		fontWeight: 500,
	},
	card2: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingBottom: 16,
	},
	card3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderColor: "#E2E0E8",
		padding:8
	},
	groupAddInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
});
