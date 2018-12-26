import { LOGIN_USER } from './actionTypes';

export default (state = {}, action) => {
    const { payload, type } = action;

    switch (type) {
        case LOGIN_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
};
