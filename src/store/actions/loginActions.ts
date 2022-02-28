//import { useFirebase } from "react-redux-firebase";
import firebase,{authService, storeService, githubProvider, getCodeUrl, getQueryUrl, githubconfig} from "../../config/firebase-config";
import type {Action} from "redux"; 
import { useDispatch } from "react-redux";
import { Alert, Linking } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { getAuth, linkWithRedirect, signInWithRedirect } from "@firebase/auth";
import queryString from "query-string";
import axuis from "axios";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { OAuthProvider } from "firebase/auth";
import { authorize, refresh, revoke } from 'react-native-app-auth';

type LogtinAction = Action<"LOGIN_SUCCESS"> & {
    email : string,
    userId:string,
    nickname:string,
    avatar:string,
    lastCommitedDate:Date,
    tag:[]
}
type LogoutAction = Action<"SIGNOUT_SUCCESS">;
type LogInErrorAction = Action<"LOGIN_ERROR">;

export type LoginActions = LogtinAction | LogoutAction | LogInErrorAction;

export const loginAction = (email:string, password:string) => {
  return (dispatch) => {
    authService
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      if(res.user){
        storeService
          .collection("User")
          .where("userId","==",res.user.uid)
          .limit(1)
          .get()
          .then(querySnapshot => { 
            querySnapshot.forEach(snapshot => {
                let data = snapshot.data();
                dispatch({
                  type: "LOGIN_SUCCESS",
                  userId: data.userId,
                  email: data.email,
                  nickname: data.nickname,
                  avatar : data.avatar,
                  lastCommitedDate : data.lastCommitedDate.toDate(),
                  tag : data.tag
                });
            })
          }).catch(err=>{
            dispatch({type:"LOGIN_ERROR"});
          })
      }
    })
  }
}

export const logoutAction = () => {
  return (dispatch) => {
    authService.signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

export const githubLoginAction = () => {
  getTokenGitOauth();
  
}

const getTokenGitOauth = async () => {
  Linking.openURL(getCodeUrl).then(result => {
    console.log(result);
  });
}