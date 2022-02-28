
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const RankScreen = () => {

  return (
    <View style={LoginScreenStyles.view}>
      
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

//export default RankScreen;