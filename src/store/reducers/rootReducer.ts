import loginReducer from './loginReducer';
import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   login: loginReducer,
//   project: boardReducer,
// });

const rootReducer = loginReducer;

export default rootReducer;