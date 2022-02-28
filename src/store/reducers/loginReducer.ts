import { Alert } from "react-native";
import { LoginActions } from "../actions/loginActions";
import { AppState } from "../state/AppState";

const initialState: AppState = {
    loggedIn: false,
    userId: "",
    email: "", 
    nickname: "",
    lastCommitedDate: new Date(),
    avatar: "",
    tag : []
};
  
const loginReducer = (state: AppState = initialState, actions: LoginActions) =>{
    switch (actions.type) {
        case 'LOGIN_SUCCESS':
            Alert.alert("로그인 성공😘");
            return {
                ...state,
                loggedIn: true,
                userId: actions.userId,
                email: actions.email, 
                nickname: actions.nickname,
                lastCommitedDate: actions.lastCommitedDate,
                avatar: actions.avatar,
                tag : actions.tag
              };
        case 'LOGIN_ERROR':
            Alert.alert("아이디 혹은 비밀번호 오류 입니다.");
            return initialState;
        case 'SIGNOUT_SUCCESS':
            Alert.alert("로그아웃 되었습니다.");
            return initialState;
        default:
            return initialState;
    }
};

export default loginReducer;