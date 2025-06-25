import { ReactNode } from "react";
import { TextInputProps, DimensionValue } from "react-native";



export interface IInputProps extends TextInputProps{
    iconLeft?: ReactNode,
    iconRight?: ReactNode,
    errorMessage?: string;
    label?: string
    height?: DimensionValue
    isTextArea?: boolean
}