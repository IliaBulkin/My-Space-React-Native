import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
	avatar: {
		alignItems: "center",
        paddingBottom: 16,
        gap: 12
	},
    view: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: 16,
        gap: 12
    },
    profileCard:{
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderColor: "#CDCED2",
        borderWidth: 1,
        borderRadius: 10,
    },
    profileCardTop:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 16,
    },
    topText:{
        color: "#070A1C",
        fontFamily: "GTWalsheimPro-Regular",
        fontSize: 16
    },
    buttonPlus: {
        position: "absolute",
        top: "73%",
        left: "25%"
    },
    nameSurname:{
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "GTWalsheimPro-Regular",
        marginBottom: 5
    },
    username:{
        fontSize: 16,
        fontFamily: "GTWalsheimPro-Regular",
    },
    buttonAvatarView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24
    },
    buttonAvatar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textAvatar: {
        color: "#543C52",
        fontSize: 16,
        fontFamily: "GTWalsheimPro-Regular"
    }
});