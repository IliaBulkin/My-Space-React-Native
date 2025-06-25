import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		borderRadius: 6,
		padding: 10,
		gap: 10,
		backgroundColor: "#FFFFFF",
		borderColor: "#E9E5EE",
		borderWidth: 1,
		flexDirection: "column",
		alignSelf: "flex-start",
		alignItems: "flex-start",
		marginBottom: 10,
		maxWidth: "85%",
	},
	messageText: {
		color: "#070A1C",
        flexWrap: "wrap",
	    flexShrink: 1,
	},
	infoCont: {
		flexDirection: "row",
		alignItems: "flex-end",
        alignSelf: "flex-end",
		justifyContent: "space-between",
	},
});
