import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
        alignItems: "flex-start",
        marginBottom: 5,
        // flex: 1,
        gap: 6,
        width: "100%"
    },
    label: {
        fontSize: 16,
        fontFamily: "GTWalsheimPro-Regular",
        color: "gray"
    },
    labelDisabled:{
        color: "#81818D",
    },
    labelActive: {
        color: "#070A1C",
    },
    input:{
        borderColor: "rgba(0, 0, 0, 0.5)",
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        fontFamily: "GTWalsheimPro-Regular",
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: "100%"
    },
    inputDisabled: {
        color: "#81818D",
        borderColor: "#CDCED2"
    },
    inputActive: {
        color: "#070A1C",
        borderColor: "#81818D"
    },
    inputError: {
        borderColor: "#F43F5E"
    },
    errorMessage: {
        color: "#F43F5E",
        fontSize: 12
    }
  
});
