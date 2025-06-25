import { StyleSheet } from "react-native";
import {COLORS} from "../../constants/colors";

export const styles = StyleSheet.create({
    button: {
        height: 60,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: "center"
    },
    text: {
        fontSize: 22,
        color: "black"
    }
})