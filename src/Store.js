import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { reducer as loginReducer } from './pages/User';

const win = window;
const history = createBrowserHistory();

const reducer = combineReducers({
    router: connectRouter(history),
    login: loginReducer
});

const historyMiddleware = routerMiddleware(history);

const middlewares = [thunk, historyMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

const store = createStore(reducer, {}, storeEnhancers);

export { history };
export default store;
