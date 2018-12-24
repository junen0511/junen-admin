import { LOGIN_USER, LOGOUT_USER } from './actionTypes';

export default (state = {}, action) => {
    const { payload } = action;

    switch (action.type) {
        case LOGIN_USER:
            return { ...state, ...payload };
        case LOGOUT_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
};
