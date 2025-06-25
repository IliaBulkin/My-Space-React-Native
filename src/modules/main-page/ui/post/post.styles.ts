import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	post: {
		borderColor: "#CDCED2",
		borderWidth: 1,
		marginTop: 12,
		borderRadius: 12,
		backgroundColor: "#fff",
		padding: 12,
		gap: 10,
	},

	top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#ccc",
	},

	name: {
		fontWeight: "bold",
		color: "#070A1C",
		fontFamily: "GTWalsheimPro-Regular",
	},

	actions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	content: {
		gap: 8,
	},

	text: {
		color: "#070A1C",
		fontSize: 14,
		fontFamily: "GTWalsheimPro-Regular",
	},

	hashtags: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 6,
	},

	hashtag: {
		color: "#543C52",
		fontSize: 14,
	},

	photoGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		gap: 4,
	},

	photo: {
		borderRadius: 8,
	},

	reactions: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginTop: 8,
		gap: 24,
	},

	reaction: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},

	reactionText: {
		fontSize: 14,
		color: "#070A1C",
		fontFamily: "GTWalsheimPro-Regular",
	},
	postActions: {
		flexDirection: "row",
		gap: 5,
	},
	// стили модалки
	mainSmallModalPostSettings: {
		width: 343,
		borderRadius: 16,
		backgroundColor: "#E9E5EE",
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 16,
		gap: 16,
	},

	headerRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},

	threeDotsSmallModal: {
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
		marginRight: -7,
		marginTop: 3
	},

	mainEditPostButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	mainDeletePostButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	separator: {
		height: 1,
		backgroundColor: "#CDCED2",
		width: "100%",
	},

	actionText: {
		fontSize: 16,
		fontFamily: "GTWalsheimPro-Regular",
	},
});
