// import { stringify } from 'qs';
import { replace } from 'connected-react-router';
import { signInApi } from './service';
import { setAuthority, setToken } from '@src/utils/authority';
import { reloadAuthorized } from '@src/utils/Authorized';
import { getPageQuery } from '@src/utils/utils';

import { LOGIN_USER } from './actionTypes';

export const login = payload => {
    return async dispatch => {
        dispatch(loginStart());
        try {
            const userInfo = await signInApi(payload);
            dispatch(loginSuccess(userInfo));
            if (userInfo.status) {
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.startsWith('/#')) {
                            redirect = redirect.substr(2);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                dispatch(replace(redirect || '/'));
            }
        } catch (error) {
            dispatch(loginError(error));
        }
    };
};

export const loginStart = () => {
    return {
        type: LOGIN_USER,
        payload: { loading: true }
    };
};

export const loginSuccess = userInfo => {
    setToken(userInfo.token);
    setAuthority('admin');
    return {
        type: LOGIN_USER,
        payload: { loading: false, ...userInfo }
    };
};

export const loginError = userInfo => {
    return {
        type: LOGIN_USER,
        payload: { loading: false, ...userInfo }
    };
};
