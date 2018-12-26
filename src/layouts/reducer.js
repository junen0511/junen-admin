import { COLLAPSED, USERINFO, LOGOUT_USER } from './actionTypes';

const initialState = {
    currentUser: {},
    collapsed: false,
    notices: []
};

export default (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case COLLAPSED:
            return { ...state, ...payload };
        case USERINFO:
            return { ...state, currentUser: payload };
        case LOGOUT_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
};
