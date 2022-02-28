
import React, { Component, useCallback, useEffect, useState  } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Board, Text } from '../../theme';
import { storeService } from '../../../config/firebase-config';


export const BoardDetailScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const [BoardDetail, setBoardDetail] = useState([]);
 
  // 네비게이션 옵션
  const title = route.params? route.params.headertitle : "";
  const boardId = route.params? route.params.boardId : 1;

  navigation.setOptions({title: title});

  // DB 
  const getBoardDetailfromDB = async () =>{
    const tempArray = [];
    await storeService
    .collection('Board')
    .doc(boardId)
    .get()
    .then(querySnapshot => { 
      let data = querySnapshot.data();
      tempArray.push(data);
      setBoardDetail(tempArray);
    })
    .catch(err => {
      console.log("GET CATEGORY LIST ERROR");
    });
  }

  useEffect(() => {
    getBoardDetailfromDB();
  }, [isFocused]);


  const getDate = useCallback((date:Date)=>{
    return (
    + ('0' + (date.getMonth() + 1)).slice(-2)
    + '/' + ('0' + (date.getDate())).slice(-2));
  },[]);


  const GetBoardDetail = () => {
    return(
      <View>
        {
          BoardDetail.map(element=>{
            return(
                <Board>
                  <View style={LoginScreenStyles.category}>
                    <Text  style={LoginScreenStyles.category_text}>{element.category_name}</Text>
                  </View>
                  <View style={LoginScreenStyles.box}>
                    <Text style={LoginScreenStyles.title}>{element.title}</Text>
                    <Text style={LoginScreenStyles.time}>{getDate(element.date.toDate())}</Text>
                  </View>
                  <Text style={LoginScreenStyles.context}>
                    {element.content}
                  </Text>
                  <Text style={[LoginScreenStyles.auth,{marginTop:15}]}>{element.is_anonymous? "익명" : element.auth_name}</Text>
                </Board>
            )
          })
        }
      </View>
    )
  };

  return (
    <View>
      <View>
          <GetBoardDetail/>
          {/* <View style={[LoginScreenStyles.reple,]}>
            <Text>댓글</Text>
          </View>
          댓글
          <Board>
            <View style={LoginScreenStyles.box}>
              <Text style={LoginScreenStyles.auth}>세븐틴_17</Text>
              <Text style={LoginScreenStyles.time}>05:26</Text>
            </View>
            <Text style={LoginScreenStyles.context}>
              그대에게, 그대에게 전해주고 싶은 이야기. 그대에게, 그대에게 말하고 싶어 이렇게 더.
            </Text>
          </Board> */}
      </View>
    </View>
  );
}

const LoginScreenStyles = StyleSheet.create({
  view : {width:"100%", flexDirection:"column"},
  box :{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'},
  category : {width:55, alignContent:"center", alignSelf:"stretch", marginVertical:3, color:"#888888", fontWeight:"bold", backgroundColor:"lavender", paddingHorizontal:10, paddingVertical:3, borderWidth:0.8, borderColor:"#b4b4de", borderRadius:10, marginHorizontal:2},
  category_text : {fontSize:10, color:"#888888", textAlign:"center"},
  title : {fontSize:18, fontWeight:'bold', overflow:'hidden'},
  time : {fontSize:12, marginTop:5, color:"#888888"},
  context : {fontSize:15, marginTop:12, color:"#666666", overflow:'hidden', textAlign:"justify", lineHeight:17},
  auth: {fontSize:13, color:"#888888", fontWeight:"bold"},
  reple:{paddingHorizontal:20, paddingVertical:5, }
});

//export default BoardScreenÍ