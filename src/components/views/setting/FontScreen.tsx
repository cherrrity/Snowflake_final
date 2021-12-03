import React, { useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, SafeAreaView, Switch, TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import {useToggleThemeContext} from "../../providers/ToggleThemeProvider"
import {Button, TopBar, View } from "../../theme";

export const FontScreen = () => {
    const theme = useTheme();
    const toggleTheme = useToggleThemeContext();
    return (
    <SafeAreaView style = {styles.safe}>
        <View style = {[styles.view,{flex:1}]}>
            <Button style = {styles.view}>
                <Text style = {[styles.text, {color: theme.colors.text, fontFamily: toggleTheme.fontFamily}]}>명조체</Text>
                <Switch style={styles.button} value={toggleTheme.isFontToggle} onValueChange={toggleTheme.fontNameToggle}/>
            </Button>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    view: {flex:1, alignItems: "center", justifyContent: "space-between"},
    topBar: {
        width: "100%",
        flexDirection: "row",
        padding: 5,
        justifyContent: "flex-end"
},
    button : {marginTop:-7},
    text: {fontSize: 15}
});