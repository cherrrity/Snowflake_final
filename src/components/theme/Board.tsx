import React, { Children } from "react";
import type {FC} from "react";
import {StyleSheet, Switch, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import {View} from "./View";
import type {ViewProps} from "./View";
import { useToggleThemeContext } from "../providers/ToggleThemeProvider";

export type BoardProps = ViewProps & {
};

export const Board:FC<BoardProps> = ({children, style, ...props})=> {
    const theme = useTheme();
    const toggleTheme = useToggleThemeContext();
    return (
        <View primary style = {[styles.board,{backgroundColor: theme.colors.card, borderColor:theme.colors.border}]} {...props}>
            {children}
        </View>)
}
const styles = StyleSheet.create({
    board:{paddingVertical:20, paddingHorizontal:20, borderBottomWidth:1, backgroundColor:"pink",},
});