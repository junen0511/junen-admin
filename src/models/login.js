import { Container } from 'unstated';
import history from '@src/history';
import { stringify } from 'qs';
import { signInApi } from '@src/services/auth';
import { setAuthority, setToken } from '@src/utils/authority';
import { reloadAuthorized } from '@src/utils/Authorized';
import { getPageQuery } from '@src/utils/utils';

export default class UserContainer extends Container {
    constructor() {
        super(...arguments);
        this.state = { status: undefined };
    }

    updateLoginStatus(payload) {
        const { token, currentAuthority } = payload;
        setToken(token);
        setAuthority(currentAuthority);
        this.setState({ ...payload });
    }

    async login(data) {
        const response = await signInApi(data);
        this.updateLoginStatus({ ...response, currentAuthority: 'admin' });

        // login successfully
        if (response.status) {
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
            history.replace(redirect || '/');
        }
    }
    logout() {
        this.updateLoginStatus({
            status: false,
            currentAuthority: 'guest',
            token: ''
        });
        reloadAuthorized();
        history.push({
            pathname: '/user/login',
            search: stringify({
                redirect: window.location.href
            })
        });
    }
}
