import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
