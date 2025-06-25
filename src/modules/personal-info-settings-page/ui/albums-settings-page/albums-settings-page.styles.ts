import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container1: {
		backgroundColor: "#FFFFFF",
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 10,
		padding: 16,
		gap: 16,
	},
	container2: {
		backgroundColor: "#FFFFFF",
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 10,
		padding: 16,
		gap: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	addPhotoButt: {
		flexDirection: "row",
		color: "#543C52",
		borderRadius: 190,
		borderWidth: 1,
		borderColor: "#543C52",
		padding: 10,
		gap: 10,
	},
	myPhotoTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 16,
	},
});
