import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	loginForm: {
		backgroundColor: "#E9E5EE",
		flex: 1,
		justifyContent: "center",
	},
	header: {
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	form: {
		paddingVertical: 44,
		paddingHorizontal: 16,
		borderRadius: 20,
		backgroundColor: "#FFFFFF",
		gap: 24,
		flexDirection: "column",
		marginHorizontal: 16,
	},
	submitButt: {
		backgroundColor: "#543C52",
		paddingVertical: 16,
		paddingHorizontal: 24,
		gap: 8,
		borderRadius: 1234,
		alignItems: "center",
	},
	inputText: {
		color: "#070A1C",
		fontWeight: 400,
		fontSize: 16,
	},
	greetingText: {
		color: "#070A1C",
		alignSelf: "center",
		fontSize: 24,
		fontWeight: 500,
	},
	loginRegisterNav: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
