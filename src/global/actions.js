import { COLLAPSED, USERINFO, LOGOUT_USER } from './actionTypes';
import { queryCurrent } from './service';
import { setAuthority, setToken } from '@src/utils/authority';
import { reloadAuthorized } from '@src/utils/Authorized';

export const updateLayoutCollapsed = payload => ({
    type: COLLAPSED,
    payload
});

export const fetchUserInfo = () => {
    return async dispatch => {
        try {
            const { data } = await queryCurrent();
            dispatch(setUserInfo(data));
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const setUserInfo = payload => ({
    type: USERINFO,
    payload
});

export const logout = () => {
    setToken('');
    setAuthority('');
    reloadAuthorized();
    return {
        type: LOGOUT_USER,
        payload: { status: false, token: '' }
    };
};
