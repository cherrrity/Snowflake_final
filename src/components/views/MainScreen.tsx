import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SvgCssUri } from 'react-native-svg';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/state/AppState';
import { useToggleThemeContext } from '../providers/ToggleThemeProvider';
import { storeService } from '../../config/firebase-config';
import { Avatar, List } from 'react-native-paper';

type User = {
  avatar: string,
  nickname: string,
  tag: []
}

type UserList = {
  name: string,
  users: []
}

const UserCommitChart = () => {
  const logged = useSelector<AppState, boolean> ((state)=>state.loggedIn);
  const nickname = useSelector<AppState, string> ((state)=>state.nickname);

  const svgurl = `https://ghchart.rshah.org/${nickname}`;

  if(logged){
    return(
      <ScrollView horizontal={true} contentOffset={{x:800, y:0}} >
        <SvgCssUri uri={svgurl}/> 
      </ScrollView>
    );
  }else{
    return(
      <View>
        <Text style={MainScreenStyle.noLogin}>로그인이 필요합니다.</Text>
      </View>
    );
  }
}

export const MainScreen = () => {
  const theme = useTheme();
  const toggleTheme = useToggleThemeContext();

  const isFocused = useIsFocused();
  const [UserList, setUserList] = useState<User[]>([]);
  const [InterestUsersList, setInterestUsersList] = useState<UserList[]>([]);

  const logged = useSelector<AppState, boolean> ((state)=>state.loggedIn);
  const userId = useSelector<AppState, string> ((state)=>state.userId);
  const tag = useSelector(state => state.tag);

  const getUsers = async () =>{
    let tempArray = new Array();
      await storeService 
        .collection('User')
        .orderBy('lastCommitedDate','desc')
        .get()
        .then(querySnapshot => { 
          querySnapshot.forEach(snapshot => {
            let data = snapshot.data();
            tempArray.push({nickname:data.nickname, avatar:data.avatar, tag:data.tag} as User);
          })
          setUserList(tempArray);
        })
        .catch(err => {
          console.log("GET BOARDz LIST ERROR");
        });
  }

  const getSameInterestUsers = async () =>{
    let tempList = [];
    if(logged){
      tag.map(async (tagName) => {
        let tempArray: User[] = [];
        await storeService.collection("User")
        //.where("tag", "array-contains", tagName)
        .get()
        .then(querySnapshot => { 
          querySnapshot.forEach(snapshot => {
            let data = snapshot.data();
            if(data.userId != userId) tempArray.push({nickname:data.nickname, avatar:data.avatar, tag:data.tag} as User);
          })
          tempList.push({ name: tagName, users: tempArray } as UserList);
        })
      });
      setInterestUsersList(tempList);
    }
  }

  useEffect(() => {
    getUsers();
    getSameInterestUsers();
  }, [isFocused]);

  // exception 처리 필요 svg 속 css에 적용되는 default-font(-apple-system)가 없어 발생함

  const LastestCommitedUsers =  () => {
    return(
      <ScrollView horizontal={true} contentOffset={{x:800, y:0}} style={{marginTop:5}} >
        {
          UserList.map((user) => {
              return(
              <View style={MainScreenStyle.user_info_box}>
                <Image style={MainScreenStyle.user_profile} source={{uri: user.avatar}}/>
                <Text style={MainScreenStyle.user_nickname}>{user.nickname}</Text>
              </View>
              )
          })
        }
      </ScrollView>
    );
  }

  const LastestCommitedUsers2 =  () => {
    if(logged){
      return(
        <View style={MainScreenStyle.box}>
          {
            tag.map((tagName:string) =>{
              return(
                <View>
                  <Text style={[MainScreenStyle.H3, {color:theme.colors.primary, fontFamily:toggleTheme.fontFamily, marginVertical:5}]}>{tagName}</Text>
                  <LastestCommitedUsers/>
                </View>
                )
            })
          }
        </View>
      );
    }
    return(
      <View style={MainScreenStyle.box}>
        <Text style={MainScreenStyle.noLogin}>로그인이 필요합니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView scrollsToTop={true} style={{backgroundColor:theme.colors.card}}>
      <View style={MainScreenStyle.view}>
        <Text style={[MainScreenStyle.H2, {color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>나의 커밋 그래프</Text>
        <View style={MainScreenStyle.box}>
          <UserCommitChart/>
        </View>
        
      </View>
      <View style={MainScreenStyle.view}>
        <Text style={[MainScreenStyle.H2, {color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>최근 커밋 했어요!</Text>
        <LastestCommitedUsers/>
      </View>
      <View style={MainScreenStyle.view}>
        <Text style={[MainScreenStyle.H2, {color:theme.colors.text, fontFamily:toggleTheme.fontFamily}]}>나와 같은 관심사를 가진 친구</Text>
        <LastestCommitedUsers2/>
      </View>
    </ScrollView>
  );
}

const MainScreenStyle = StyleSheet.create({
  view : {flex:1, flexDirection:'column', alignContent:"center", paddingHorizontal:20, paddingVertical:15,},
  box: {marginVertical:20},
  H1 : {fontSize:25, fontWeight:'500'},
  H2 : {fontSize:22, fontWeight:'700'},
  H3 : {fontSize:18, fontWeight:'500'},
  user_profile : {width:50, height:50, borderRadius:100,},
  user_info_box : {marginVertical:10,marginHorizontal:5, justifyContent:"center", alignItems:"center"},
  user_nickname: {fontSize: 10, marginTop:5, },
  noLogin:{color:"red"}

});

//export default MainScreen;