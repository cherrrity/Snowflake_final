import React, {useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//Views
import {SettingScreen, FontScreen, ThemeScreen, MyScreen} from "../views";
import Icon from "react-native-vector-icons/MaterialIcons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// export function BoardNavigator(){
//     return (
//         // 게시판 이름 받아서 name? 대신 출력해야 함
//     <Stack.Navigator initialRouteName="게시판목록">
//         <Stack.Screen name = "게시판목록" options={{headerTitle:"게시판 목록"}} component={BoardListScreen}></Stack.Screen>
//         <Stack.Screen name = "게시판"  component={BoardScreen}></Stack.Screen>
//         <Stack.Screen name = "글작성"  component={BoardScreen}></Stack.Screen>
//         <Stack.Screen name = "게시글내용" component={BoardDetailScreen}></Stack.Screen>
//     </Stack.Navigator>);
// }

export function SettingNavigator(){
    return (
    <Stack.Navigator>
        <Stack.Screen name = "설정" component={SettingScreen}></Stack.Screen>
        <Stack.Screen name = "다크모드" component={ThemeScreen}></Stack.Screen>
        <Stack.Screen name = "서체" component={FontScreen}></Stack.Screen>
    </Stack.Navigator>);
}

export function MainBottomNavigator(){
    return(
    <Tab.Navigator screenOptions={({route})=>({
        tabBarIcon:({focused, color, size}) => {
            let iconName:string = '';
            if(route.name === "home") {
                iconName = 'home'
               } else if(route.name === 'rank') {
                iconName = 'emoji-events'
               } else if (route.name === 'board') {
                iconName = 'forum'
               } else if (route.name === 'My') {
                iconName = 'account-circle'
               } else if (route.name === 'setting') {
                iconName = 'tune'
               }
               return <Icon name={iconName} size={size} color={color} />
            }
    })}
    >
        {/* <Tab.Screen name = "home" options={{title:"홈"}} component={MainScreen}/>
        <Tab.Screen name = "rank" options={{title:"랭크"}} component={RankScreen}/>
        <Tab.Screen name = "board" options={{title:"게시판", headerShown:false}} component={BoardNavigator}/>
         */}
        <Tab.Screen name = "My" component={MyScreen}/>
        <Tab.Screen name = "setting" options={{title:"설정", headerShown:false}} component={SettingNavigator} />
    </Tab.Navigator>
    );
}
