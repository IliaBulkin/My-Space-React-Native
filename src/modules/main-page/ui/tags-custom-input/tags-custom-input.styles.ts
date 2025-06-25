import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	mainCustomTagsTextInputView: {
		position: "relative",
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		paddingRight: 80,
		paddingLeft: 12,
	},
	customTagsTextInput: {
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 14,
		paddingRight: 10,
		height: 42,
	},
	buttonAddCustomTag: {
		position: "absolute",
		right: 10,
		top: 7,
		backgroundColor: "#543C52",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 10,
	},
	mainTagsView: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 10,
	},
	mappingTagsView: {
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
	textTags: {
		fontFamily: "GTWalsheimPro-Regular",
		color: "#070A1C",
		fontSize: 15,
		paddingLeft: 6,
	},
	closeIconView: {
		backgroundColor: "#F43F5E",
		borderRadius: 30,
		height: 18,
		width: 18,
		alignItems: "center",
		justifyContent: "center",
	},
});
