import { StyleSheet } from "react-native";
import { COLORS } from "../../../../shared/constants";

export const styles = StyleSheet.create({
    mainModalWindow: {
        width: 375,
        minHeight: 523,
        backgroundColor: COLORS.WHITE,
        borderRadius: 20,
        paddingTop: 24,
        paddingRight: 16,
        paddingBottom: 44,
        paddingLeft: 16,
    },
    closeModalButton: {
        alignItems: "flex-end",
        width: 343,
        height: 20,
    },
    mainModalInputsFrame: {
        width: 343,
        minHeight: 368,
        paddingTop: 24,
        paddingBottom: 24,
    },
    themeModalInputFrame: {
        width: 343,
        minHeight: 66,
        gap: 6,
    },
    sendPostModalButton: {
        width: 130,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#543C52",
        flexDirection: "row",
    },
    imageIconViewStyles: {

    },
    imageDeleteButton: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        margin: 5
    },
});
