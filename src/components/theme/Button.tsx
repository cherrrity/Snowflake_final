import React, { Children } from "react";
import type {FC} from "react";
import {StyleSheet, Switch, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import {View} from "./View";
import type {ViewProps} from "./View";
import { useToggleThemeContext } from "../providers/ToggleThemeProvider";

export type ButtonProps = ViewProps & {
};

export const Button:FC<ButtonProps> = ({children, style, ...props})=> {
    const theme = useTheme();
    const toggleTheme = useToggleThemeContext();
    return (
        <View primary style = {[styles.button1,{backgroundColor: theme.colors.card, borderColor:theme.colors.border}]} {...props}>
            {children}
            {/* <Switch value={theme.dark} onValueChange={toggleTheme}/> */}
        </View>)
}
const styles = StyleSheet.create({
    button1:{width:350, height:50, flexDirection:"row", justifyContent:"space-between", borderRadius:10, borderWidth:1,margin:10, paddingVertical: 15, paddingHorizontal:10},
   
});