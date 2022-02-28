
import React, { Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert,} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginAction, logoutAction, githubLoginAction } from '../../store/actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { useToggleThemeContext } from '../providers/ToggleThemeProvider';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleTheme = useToggleThemeContext();

  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const updateEmail = useCallback((userEmail)=>{ setEmail(userEmail)},[]);
  const updatePwd = useCallback((userPasswd)=>{ setPwd(userPasswd)},[]);
  
  const emailLogin = () => {
    try {
      console.log(email, pwd);
    } catch (error) {
      
    }
    //dispatch(loginAction("hyej0126@sookmyung.ac.kr",  "admin1234"));
  }

  const githubLogin = () => {
    Alert.alert("firebase에서 깃허브 auth를 지원하지 않습니다");
  };

  return (
    <View style={LoginScreenStyles.view}>
      <Text style={[LoginScreenStyles.H1,{color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>LOGIN</Text>
      <View style={LoginScreenStyles.inputBox}>
        <TextInput placeholder="your id" style={LoginScreenStyles.input} onChange={updateEmail}></TextInput>
        <TextInput placeholder="your password" secureTextEntry={true} style={LoginScreenStyles.input} onChange={updatePwd}></TextInput>
      </View>
      <View>
        <TouchableOpacity style={LoginScreenStyles.button} onPress={emailLogin}>
          <Text style={[LoginScreenStyles.innerButton,{color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={LoginScreenStyles.decoline}></View>
      <View>
        <TouchableOpacity style={[LoginScreenStyles.button,{backgroundColor:theme.colors.text}]} onPress={githubLogin}>
          <Text style={[LoginScreenStyles.innerButton, {color:theme.colors.background}]}>
          <Icon name="github" size={20} style={{marginRight:10, paddingRight:10}}/>
          <Text>  </Text>
              Github으로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const LoginScreenStyles = StyleSheet.create({
  view : {flex: 1, flexDirection:"column", paddingVertical:50, paddingHorizontal:30},
  inputBox : {marginVertical:20},
  input: {marginVertical:5, backgroundColor:"white"},
  H1 : {fontSize:25, fontWeight:'500'},
  button : {backgroundColor:"#3672d1", paddingVertical:15},
  innerButton:{textAlign:"center", color:"white"},
  decoline:{ background:"black", borderTopWidth:1, borderLeftWidth:0, borderRightWidth:0, borderBottomWidth:0, borderColor:"#d6d6d4", marginVertical:20}
});