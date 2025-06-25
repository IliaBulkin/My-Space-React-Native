import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		// padding: 16,
	},
	header: {
		alignItems: "center",
		marginBottom: 12,
		marginTop: 8,
		padding: 16,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10
	},
	profileImageWrapper: {
		borderRadius: 48,
		overflow: "hidden",
		width: 96,
		height: 96,
		marginBottom: 8,
	},
	profileImage: {
		width: 96,
		height: 96,
		borderRadius: 48,
	},
	name: {
		fontSize: 24,
		fontWeight: "600",
		color: "#000",
	},
	username: {
		fontSize: 16,
		color: "#7A7A7A",
		marginBottom: 16,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 48,
	},
	statBlock: {
		alignItems: "center",
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "700",
	},
	statLabel: {
		fontSize: 16,
		color: "#7A7A7A",
		fontWeight: "500"
	},
	albumsWrapper: {
		padding: 16,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10
	},
	albumHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	albumTitle: {
		fontSize: 16,
		fontWeight: "600",
	},
	viewAll: {
		color: "#543C52",
		fontWeight: "500",
	},
	albumCard: {
		borderRadius: 12,
		backgroundColor: "#F5F5F5",
		padding: 12,
	},
	albumName: {
		fontWeight: "600",
		fontSize: 14,
	},
	albumSubtitle: {
		fontSize: 12,
		color: "#7A7A7A",
		marginBottom: 8,
	},
	albumImagePlaceholder: {
		height: 150,
		borderRadius: 10,
		backgroundColor: "#ccc",
	},
	postsContainer: {
		gap: 16,
	},
});
