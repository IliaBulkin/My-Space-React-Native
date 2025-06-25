import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
	containerMainView: {
		backgroundColor: "#fff",
		borderRadius: 20,
		paddingTop: 24,
        paddingBottom: 24,
		width: "90%",
        minHeight: 467,
        alignItems: "flex-start",
        justifyContent: "center",
        alignSelf: "center"
	},
	titleDetailsMainText: {
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
		color: "#070A1C",
        fontFamily: "GTWalsheimPro-Regular",
	},
	variantsOfNameAndSurnameText: {
		fontSize: 14,
		marginTop: 8,
		color: "#070A1C",
		textAlign: "center",
        fontFamily: "GTWalsheimPro-Regular",
		marginBottom: 24
	},
	buttonNext: {
		backgroundColor: "#543C52",
		borderRadius: 30,
		alignItems: "center",
        justifyContent: "center",
        width: 112,
        height: 40,
        alignSelf: "center"
	},
	buttonNextText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "600",
        fontFamily: "GTWalsheimPro-Regular",
	},
	inputLabelText: {
		marginBottom: 6,
		fontFamily: "GTWalsheimPro-Regular",
		fontSize: 16,
		color: "#070A1C"
	}
});
