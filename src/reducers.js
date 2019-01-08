import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

// all reducers
import { reducer as global } from './global';
import { reducer as login } from './pages/User';
import { reducer as column } from './pages/Column';
import { reducer as article } from './pages/Article';

export default history =>
    combineReducers({
        router: connectRouter(history),
        global,
        login,
        column,
        article
    });
