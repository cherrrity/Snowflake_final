
import React, { Component, useCallback, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MyScreen = () => {

  return (
    <View style={LoginScreenStyles.view}>
  
    </View>
  );
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