import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	// styleDropdownMenu: {
	// 	borderWidth: 1,
	// 	borderRadius: 10,
	// 	borderColor: "#ccc",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	overflow: "hidden",
	// 	height: 42,
	// },
	// styleSelectorContainer: {
	// 	borderRadius: 10,
	// 	overflow: "hidden",
	// 	borderWidth: 0,
	// 	shadowColor: "transparent",
	// },
	// styleListContainer: {
	// 	borderWidth: 1,
	// 	borderColor: "#CDCED2",
	// 	borderTopLeftRadius: 10,
	// 	borderTopRightRadius: 10,
	// 	backgroundColor: "#fff",
	// 	marginTop: 5,
	// 	maxHeight: 250,

	// },
	// styleDropdownMenuSubsection: {
	// 	paddingRight: 5,
	// 	height: 51,
	// },
	mainInputTagsView: {
		marginBottom: 10,
		position: "relative",
	},
	mainInputTagsTouchableOpacity: {
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 12,
		// paddingVertical: 10,
		paddingHorizontal: 14,
		height: 42,
		justifyContent: "center",
	},

	tagsView: {
		position: "absolute",
		top: 50,
		left: 0,
		right: 0,
		borderRadius: 12,
		backgroundColor: "#fff",
		borderColor: "#D1D5DB",
		borderWidth: 1,
		maxHeight: 250,
		overflow: "hidden",
		zIndex: 9999,
		elevation: 10, // для дроида
	},
	tagsInputSearch: {
		height: 40,
		borderBottomWidth: 1,
		borderColor: "#ccc",
		margin: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: "#fff",
		fontFamily: "GTWalsheimPro-Regular",
	},
	tagsTouchableOpacity: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		marginBottom: 6,
	},
	tagsConfirmButtonTouchableOpacity: {
		backgroundColor: "#543C52",
		padding: 12,
		borderTopWidth: 1,
		borderTopColor: "#D1D5DB",
	},

	selectedTagMainView: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 10,
	},
	selectedTagView: {
		borderWidth: 2,
		borderColor: "#CDCED2",
		// backgroundColor: "#F3F4F6",
		borderRadius: 25,
		paddingHorizontal: 5,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	},
	selectedTagText: {
		fontFamily: "GTWalsheimPro-Regular",
		color: "#070A1C",
		fontSize: 15,
		paddingLeft: 10,
	},
	selectedTagCloseButtonView: {
		backgroundColor: "#F43F5E",
		borderRadius: 30,
		height: 18,
		width: 18,
		alignItems: "center",
		justifyContent: "center",
	},
});
