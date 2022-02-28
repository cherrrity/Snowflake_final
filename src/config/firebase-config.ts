// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";
import "@react-native-firebase/auth";
import { Linking } from "react-native";
import { GithubAuthProvider, OAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBBO27u9ETUTmpIDdsQk-ERirR9MXcRnRc",
  authDomain: "https://snowflake-fc855.firebaseapp.com",
  databaseURL: "https://snowflake-fc855-default-rtdb.firebaseio.com",
  projectId: "snowflake-fc855",
  storageBucket: "https://snowflake-fc855.appspot.com",
  messagingSenderId: "317046467841",
  appId: "1:317046467841:web:7920f49de5335f1a4abf00",
  measurementId: "G-341NZX54C4"
};

export const githubconfig = {
  redirectionURL : 'https://snowflake-fc855.firebaseapp.com/__/auth/handler',
  clientId: '73356f07e1b7b5381ef0',
  clientSecret: 'cbcbfa2c292d89733de40fe08c1110404e8ca58d',
  scopes: "user,repo",
  additionalHeaders: { 'Accept': 'application/json' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/73356f07e1b7b5381ef0'
  }
};

export let getCodeUrl = `https://github.com/login/oauth/authorize?client_id=${githubconfig.clientId}&scope=${githubconfig.scopes})`;
export let getQueryUrl = `https://github.com/login/oauth/access_token?client_id=${githubconfig.clientId}&client_secret=${githubconfig.clientSecret}&code=${"fa54d863537ea8c84340"}&redirect_uri=${githubconfig.redirectionURL})`;

export var githubProvider = new GithubAuthProvider(); 
githubProvider.setCustomParameters({
  "client_id": githubconfig.clientId, 
  "redirect_uri": githubconfig.redirectionURL,
  "scope": githubconfig.scopes,
  "response_type": "json",
  "allow_signup": "false"
});
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.auth();

export default firebase;
export const storeService = firebase.firestore();
export const authService = firebase.auth();


// export const firebaseAuth = firebase.auth();
// export const firebaseFireStore = firebase.firestore();
// export const githubProvider = firebase.auth.GithubAuthProvider;
