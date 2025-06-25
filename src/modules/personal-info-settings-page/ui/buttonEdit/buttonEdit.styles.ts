import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
		borderColor: "#543C52",
		borderRadius: 50,
		padding: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
        height: 41.5,
        minWidth: 41.5
    },
	buttonActive: {
		backgroundColor: "#E9E5EE"
	},
    text: {
        fontSize: 14
    }
});
