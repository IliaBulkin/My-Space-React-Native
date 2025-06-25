import { TouchableOpacity, Text } from "react-native";
import { IButtonProps } from "./button.types";
import { styles } from "./button.styles";



export function Button(props: IButtonProps){
    const {text, ...touchableOpacityProps} = props

    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            style={styles.button}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}