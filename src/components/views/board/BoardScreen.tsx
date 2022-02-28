
import React, { Component, useCallback, useEffect, useLayoutEffect, useState  } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Board, Text} from "../../theme";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import { useNavigation, useRoute, NavigatorScreenParams, useIsFocused} from "@react-navigation/native";
import { indigo100 } from 'react-native-paper/lib/typescript/styles/colors';
import { storeService } from '../../../config/firebase-config';

export const BoardScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const [boardList, setBoardList] = useState([]);

  // 네비게이션 옵션
  const title = route.params? route.params.headertitle : "";
  const category_Id = route.params? route.params.categoryId : 1;

  navigation.setOptions({
    headerRight:()=>(
    <Text style={{marginRight:15}} onPress={()=>{navigation.navigate("글작성",{headertitle:title, category_Id:category_Id});}}>글작성</Text>)})

  navigation.setOptions({title: title});
  const goDetail = useCallback(({title, boardId})=>{
    navigation.navigate("게시글내용", {headertitle: title, boardId: boardId});
  },[]);

  navigation.setOptions({title: route.params.headertitle});

  // DB get data
  const getBoardfromDB = async () =>{
    const tempArray = [];
    await storeService 
      .collection('Board')
      .where("category_ID","==",category_Id)
      .orderBy("date","desc")
      .get()
      .then(querySnapshot => { 
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          data.no = snapshot.id;
          tempArray.push(data);
        })
        setBoardList(tempArray);
      })
      .catch(err => {
        console.log("GET BOARDz LIST ERROR");
      });
  }

  useEffect(() => {
    getBoardfromDB();
  }, [isFocused]);

  const getDate = useCallback((date:Date)=>{
    return (
    + ('0' + (date.getMonth() + 1)).slice(-2)
    + '/' + ('0' + (date.getDate())).slice(-2));
  },[]);

  const GetBoardList = () => {
    return(
      <View>
        {
          boardList.map(element=>{
            return(
              <TouchableOpacity onPress={() => goDetail({title:element.category_name, boardId:element.no})}>
                <Board>
                  <View style={LoginScreenStyles.category}>
                    <Text  style={LoginScreenStyles.category_text}>{element.category_name}</Text>
                  </View>
                  <View style={LoginScreenStyles.box}>
                    <Text style={LoginScreenStyles.title}>{element.title}</Text>
                    <Text style={LoginScreenStyles.time}>{getDate(element.date.toDate())}</Text>
                  </View>
                  <Text numberOfLines={5} style={LoginScreenStyles.context}>
                    {element.content}
                  </Text>
                  <Text style={LoginScreenStyles.auth}>{element.is_anonymous? "익명" : element.auth_name}</Text>
                </Board>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  };

  return (
    <ScrollView>
      <View>
        <GetBoardList/>
      </View>
    </ScrollView>
  );
}

const LoginScreenStyles = StyleSheet.create({
  view : {width:"100%", flexDirection:"column"},
  box :{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'},

  category_box : {flexWrap:'wrap', marginTop:8, width: "70%", flexDirection:"row", justifyContent:"center", alignItems:"center", alignContent:"center"},
  category : {width:55, alignContent:"center", alignSelf:"stretch", marginBottom:4, color:"#888888", fontWeight:"bold", backgroundColor:"lavender", paddingHorizontal:10, paddingVertical:3, borderWidth:0.8, borderColor:"#b4b4de", borderRadius:10, marginHorizontal:2},
  category_text : {fontSize:10, color:"#888888",textAlign:"center"},

  title : {fontSize:18, fontWeight:'bold', overflow:'hidden'},
  time : {fontSize:12, marginTop:5, color:"#888888"},
  context : {fontSize:15, marginTop:15, color:"#666666", overflow:'hidden', textAlign:"justify", lineHeight:17},
  auth: {fontSize:13, marginTop:15, color:"#888888", fontWeight:"bold"},
});

//export default BoardScreenÍ