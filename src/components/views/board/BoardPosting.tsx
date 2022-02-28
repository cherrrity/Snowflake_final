
import React, { Component, useCallback, useState  } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import { Button, Checkbox} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Board, Text } from '../../theme';
import { useNavigation, useRoute } from "@react-navigation/native";
import { storeService } from '../../../config/firebase-config';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/state/AppState';
import Toast from 'react-native-simple-toast';

export const BoardPosting = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const headertitle = route.params? route.params.headertitle : "";
  const category_ID = route.params? route.params.category_Id : 1;

  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const updateTitle = useCallback((title)=>{ setTitle(title)},[]);
  const updateContent = useCallback((content)=>{ setContent(content)},[]);

  const userId = useSelector<AppState, string>(state => state.userId);
  const user_nickname = useSelector<AppState, string>(state => state.nickname);


  const boardStore = async() =>{
    await storeService
    .collection('Board')
    .add({
      auth_ID: userId,
      auth_name: user_nickname,
      is_anonymous:checked,
      title:title,
      content:content,
      date:new Date(),
      category_ID: category_ID,
      category_name: headertitle
    })
    .then(()=>{
     // Toast.show("글 작성이 완료되었습니다");
      navigation.goBack();
    }).catch(err => {
      console.log("GET CATEGORY LIST ERROR");
    });
  }

  return (
    <View style={LoginScreenStyles.view}>
      <View style={LoginScreenStyles.box}>
        <View style={LoginScreenStyles.category}>
          <Text style={LoginScreenStyles.category_text}>{headertitle}</Text>
        </View>
        <View style={LoginScreenStyles.anno}>
          <Text style={[LoginScreenStyles.category_text,{fontSize:12}]}>익명설정</Text>
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}/>
        </View>
      </View>
      <View style={LoginScreenStyles.inputBox}>
        <TextInput placeholder="제목" onChangeText={updateTitle} style={LoginScreenStyles.input}></TextInput>
      </View>
      <View style={LoginScreenStyles.inputBox}>
        <TextInput placeholder="글내용" onChangeText={updateContent} multiline={true} style={[LoginScreenStyles.input, {height:300}]}></TextInput>
      </View>
      <View style={LoginScreenStyles.box}>
        <TouchableOpacity style={LoginScreenStyles.button} onPress={boardStore}>
            <Text>글 발행</Text>
        </TouchableOpacity>
      </View>
    </View>
      
  );
}

const LoginScreenStyles = StyleSheet.create({
  view : {width:"100%", height:"100%", flexDirection:"column", backgroundColor:"white", padding:20},
  box :{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'},
  category : { height:20, alignContent:"center", alignSelf:"stretch", marginVertical:3, color:"#888888", fontWeight:"bold", backgroundColor:"lavender", paddingHorizontal:10, paddingVertical:3, borderWidth:0.8, borderColor:"#b4b4de", borderRadius:10, marginHorizontal:2},
  category_text : {fontSize:10, color:"#888888"},
  anno:{width:70, height:22, justifyContent:"center", alignItems:"center", alignSelf:"stretch", flexDirection:"row",},
  title : {fontSize:18, fontWeight:'bold', overflow:'hidden'},
  time : {fontSize:12, marginTop:5, color:"#888888"},
  context : {fontSize:15, marginTop:12, color:"#666666", overflow:'hidden', textAlign:"justify", lineHeight:17},
  auth: {fontSize:13, color:"#888888", fontWeight:"bold"},
  reple:{paddingHorizontal:20, paddingVertical:5, },
  inputBox : { marginTop:10, borderRadius:20, },
  input: {backgroundColor:"#efefef", fontSize:14, padding:10, borderRadius:8, borderWidth:0.8, borderColor:"#aaaaaa"},
  H1 : {fontSize:25, fontWeight:'500'},
  innerButton:{textAlign:"center", color:"white"},
  decoline:{ background:"black", borderTopWidth:1, borderLeftWidth:0, borderRightWidth:0, borderBottomWidth:0, borderColor:"#d6d6d4", marginVertical:20},
  button:{
    flex:1,
    fontSize: 20,
    color:"#888888",
    borderRadius:5,
    height:50,
    borderWidth:0.8, 
    borderColor:"#b4b4de",
    backgroundColor:"lavender",
    justifyContent:"center",
    alignItems:"center",
    marginTop:10
}
});

//export default BoardScreenÍ