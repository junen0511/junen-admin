import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { reducer as loginReducer } from './pages/User';
import { reducer as globalReducer } from './layouts';

export default history =>
    combineReducers({
        global: globalReducer,
        router: connectRouter(history),
        login: loginReducer
    });
