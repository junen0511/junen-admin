import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

const win = window;
const history = createBrowserHistory();

const historyMiddleware = routerMiddleware(history);

const middlewares = [thunk, historyMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    win && win.devToolsExtension ? win.devToolsExtension() : f => f
);

const store = createStore(createRootReducer(history), {}, storeEnhancers);

export { history };
export default store;
