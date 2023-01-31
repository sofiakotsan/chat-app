import { combineReducers, createStore} from 'redux';
import authReducer from './reducers/auth';
import usersReducer from './reducers/users';
import messagesReducer from './reducers/messages';

const chatReducer = combineReducers({authReducer, usersReducer, messagesReducer});
const store = createStore(chatReducer);

export default store;