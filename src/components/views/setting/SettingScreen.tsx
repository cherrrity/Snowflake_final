import React, { useCallback } from "react";
import {useTheme} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, SafeAreaView, Switch, TouchableOpacity} from "react-native";
import { useToggleThemeContext } from "../../providers/ToggleThemeProvider";
import {Button, TopBar, View } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export const SettingScreen = () => {
    const theme = useTheme();
    const toggleTheme = useToggleThemeContext();
    const navigation = useNavigation();

    const goTheme = useCallback(()=>{
        navigation.navigate("다크모드");
    },[]);
    const goFont = useCallback( ()=>{
        navigation.navigate("서체");
    },[]);

    return (
    <SafeAreaView style = {styles.safe}>
        <View style = {[styles.view,{flex:1}]}>
            <TouchableOpacity onPress={goTheme}>
                <Button>
                    <Text style = {[styles.text, {color: theme.colors.text, fontFamily: toggleTheme.fontFamily}]}>다크모드</Text>
                </Button>
            </TouchableOpacity>
            <TouchableOpacity onPress={goFont}>
                <Button>
                    <Text style = {[styles.text, {color: theme.colors.text, fontFamily: toggleTheme.fontFamily}]}>서체</Text>
                </Button>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {flex: 1},
    view : {flex: 1, flexDirection:"column", paddingVertical:30, paddingHorizontal:15, alignItems:"center"},
    text: {fontSize: 15},
});