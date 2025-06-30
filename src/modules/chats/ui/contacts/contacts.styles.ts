import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		padding: 16,
		gap: 24,
		marginTop: 6,
	},
	contactsTop: {
		gap: 8,
		flexDirection: "row",
		alignItems: "center",
		color: "#070A1C",
		marginBottom: 16
	},
	search: {
		backgroundColor: "#FFFFFF",
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 13,
		marginBottom: 16
	},
	contactsList: {
		gap: 16,
	},
});
