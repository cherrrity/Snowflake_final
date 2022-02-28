
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import React, { Component, useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect, useDispatch, useSelector, useStore } from 'react-redux';
import { AppState } from '../../store/state/AppState';
import { useToggleThemeContext } from '../providers/ToggleThemeProvider';
import { LoginScreen } from './LoginScreen';

const MyTagList = () => {
  const tag = useSelector(state => state.tag);

  return (
    <View style={LoginScreenStyles.category_box}>
    {tag.map(element=>{
        return(
          <View style={LoginScreenStyles.category}>
            <Text style={LoginScreenStyles.category_text}>{element}</Text>
          </View>
        )
      })}
    </View>
  )
}

const CommitMessage = () => {
  const theme = useTheme();
  const toggleTheme = useToggleThemeContext();
  
  return (
    <Text style={[LoginScreenStyles.commit_date, {color:theme.colors.primary, fontFamily:toggleTheme.fontFamily}]}>{dateDiffrent()}</Text>
  )
}

const dateDiffrent = () =>{
  const today = new Date();
  const timeValue = useSelector<AppState, Date>(state => state.lastCommitedDate);;

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전에 커밋했어요🥰';
  if (betweenTime < 60) {
      return `${betweenTime}분전에 커밋했어요😘`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전에 커밋했어요😆`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  const betweenTimeWeek = Math.floor(betweenTime / 60 / 24/ 7);

  if (betweenTimeDay > 7) {
    return `커밋한지 ${betweenTimeWeek}주가 지났어요😅`;
 }else if (betweenTimeDay < 365) {
      return `커밋한지 ${betweenTimeDay}일이 지났어요😢`;
  }

  return `커밋한지 ${Math.floor(betweenTimeDay / 365)}년이 지났어요..😰`;
};

export const MyScreen = () => {
  const theme = useTheme();
  const toggleTheme = useToggleThemeContext();

  const loggedIn = useSelector<AppState, boolean>(state => state.loggedIn);
  const email = useSelector<AppState, string>(state => state.email);
  const nickname = useSelector<AppState, string>(state => state.nickname);
  const avatar = useSelector<AppState, string>(state => state.avatar);

  if(!loggedIn){
    return(<LoginScreen/>);
  }else{
    return (
      <View style={LoginScreenStyles.view}>
        <View style={[LoginScreenStyles.user_profile_box,{}]}>
          <Image style={LoginScreenStyles.user_profile} source={{uri: avatar}}/>
          <Text style={[LoginScreenStyles.user_nickname,  {color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>{nickname}</Text>
          <View style={LoginScreenStyles.user_info_box}>
            <Icon name="email" size={18} color="#333333"></Icon>
            <Text> </Text>
            <Text style={[LoginScreenStyles.user_email, {color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>{email}</Text>
          </View>
          {/* 커밋 응원 메세지 */}
          <CommitMessage/>
          {/* 관심사 */}
          <MyTagList/>
        </View>
      </View>
    );
  }
}

const LoginScreenStyles = StyleSheet.create({
  view : {flex: 1, flexDirection:"column", paddingVertical:30, paddingHorizontal:15, alignItems:"center"},
  user_profile_box : {flex:1, width:"100%", maxHeight:270, alignItems:"center", borderBottomWidth:1, borderBottomColor:"#dddddd"},
  user_profile : {width:120, height:120, borderRadius:100,},
  user_info_box : {marginTop:8, flexDirection:"row", justifyContent:"center", alignItems:"center", alignContent:"center"},
  user_nickname: {fontSize: 16, marginTop:10, fontWeight:"bold"},
  user_email : { color:"#333333", alignItems:"center",},
  commit_date : {marginTop:8, fontSize:12, color:"purple", alignItems:"center",},
  category_box : {flexWrap:'wrap', marginTop:8, width: "70%", flexDirection:"row", justifyContent:"center", alignItems:"center", alignContent:"center"},
  category : { alignContent:"center", alignSelf:"stretch", marginVertical:1.5, color:"#888888", fontWeight:"bold", backgroundColor:"lavender", paddingHorizontal:10, paddingVertical:5, borderWidth:0.8, borderColor:"#b4b4de", borderRadius:10, marginHorizontal:2},
  category_text : {fontSize:10, color:"#888888"},
});

//export default MyScreen;

// mapStateToProps 는 리덕스 스토어의 상태를 조회해서 어떤 것들을 props 로 넣어줄지 정의합니다.
// 현재 리덕스 상태를 파라미터로 받아옵니다.