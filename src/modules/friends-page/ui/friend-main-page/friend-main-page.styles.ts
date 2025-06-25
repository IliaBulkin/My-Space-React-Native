import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	mainBlockView: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		padding: 16,
		alignItems: "center",
        marginBottom: 8
	},
	mainNavigationView: {
		height: 20,
		width: "95%",
		flexDirection: "row",
		justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
	},
	mainNavigationText: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		fontWeight: "700",
	},

    userCardView: {
        width: "95%",
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
        padding: 16,
    }
});
