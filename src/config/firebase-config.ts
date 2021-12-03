// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBBO27u9ETUTmpIDdsQk-ERirR9MXcRnRc",
  authDomain: "snowflake-fc855.firebaseapp.com",
  projectId: "snowflake-fc855",
  storageBucket: "snowflake-fc855.appspot.com",
  messagingSenderId: "317046467841",
  appId: "1:317046467841:web:0b64fa93ceda45b34abf00",
  measurementId: "G-SC8G5DN3BY",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
// export const firebaseAuth = firebase.auth();
// export const firebaseFireStore = firebase.firestore();
// export const githubProvider = firebase.auth.GithubAuthProvider;
