
import React, { Component, useCallback, useEffect, useState  } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Board, Text } from '../../theme';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { storeService } from '../../../config/firebase-config';

export const BoardListScreen = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // DB 
  const getBoarCategotyfromDB = async () =>{
    const tempArray = [];
    await storeService
    .collection('BoardList')
    .get()
    .then(querySnapshot => { 
      setBoardCategory([]);
      querySnapshot.forEach(snapshot => {
        let data = snapshot.data();
        tempArray.push(data);
      })
      setBoardCategory(tempArray);
    })
    .catch(err => {
      console.log("GET CATEGORY LIST ERROR");
    });
  }

  const goBoard = useCallback(({title, id})=>{
    console.log("SEND PAMAM : ", title, id);
    navigation.navigate("게시판", {headertitle: title, categoryId:id});
  },[]);

  const [boardCategory, setBoardCategory] = useState([]);

  const updateBoardCategory = useCallback((data)=>{
    boardCategory.push(data);
  }, [boardCategory]);

  useEffect(() => {
    getBoarCategotyfromDB();
  },[isFocused]);

  const GetCategoryList = () => {
    return(
      <View>
        {
          boardCategory.map(element=>{
            return(
              <TouchableOpacity onPress={() => goBoard(element)}>
                <Board>
                  <View style={[LoginScreenStyles.box]}>
                    <Text>{element.title}</Text>
                    <Icon name="angle-right" size={15}></Icon>
                  </View>
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
        <GetCategoryList/>
      </View>
    </ScrollView>
  );
}

const LoginScreenStyles = StyleSheet.create({
  view : {width:"100%", flexDirection:"column"},
  box :{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'},
});

//export default BoardScreenÍ