import React from "react";
import type {FC, ComponentProps} from "react";
import {Text as RNText} from "react-native";
import {useTheme} from "@react-navigation/native";
import { useToggleThemeContext } from "../providers/ToggleThemeProvider";

export type TextProps = ComponentProps<typeof RNText>;
export const Text: FC<TextProps> = ({style, ...props}) => {
    const toggleTheme = useToggleThemeContext();
    const {colors} = useTheme();
    return <RNText style = {[{color: colors.text, fontFamily:toggleTheme.fontFamily,}, style]}
{...props}/>;
}
export const UnderlineText: FC<TextProps> = ({style, ...props}) => {
    const toggleTheme = useToggleThemeContext();
    const {colors} = useTheme();
    return (<RNText style = {[{
        textDecorationLine: "underline",
        color: colors.text,
        fontFamily:toggleTheme.fontFamily,
        textDecorationColor: colors.text
    }, style]} {...props}/>);
}