import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants/colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 30,
	},
	form: {
		width: 343,
		minHeight: 421,
		paddingVertical: 40,
		alignItems: "center",
		justifyContent: "center",
		gap: 36,
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
	},
	buttonRegister: {
		width: 311,
		height: 52,
		backgroundColor: "#543C52",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
	},
	textEmailContainer: {
		width: 311,
	},
	buttonsBlock: {
		gap: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		height: 56,
		width: "100%",
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: 0,
	},
});
