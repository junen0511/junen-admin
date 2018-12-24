import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Store, { history } from './Store';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';

const { AuthorizedRoute } = Authorized;

class App extends React.Component {
    render() {
        const routerData = getRouterData();
        const UserLayout = routerData['/user'].component;
        const BasicLayout = routerData['/'].component;

        return (
            <Provider store={Store}>
                <LocaleProvider locale={zhCN}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route path="/user" render={props => <UserLayout {...props} routerData={routerData} />} />
                            <AuthorizedRoute
                                path="/"
                                render={props => <BasicLayout {...props} routerData={routerData} />}
                                authority={['admin', 'user']}
                                redirectPath={getQueryPath('/user/login', {
                                    redirect: window.location.href
                                })}
                            />
                        </Switch>
                    </ConnectedRouter>
                </LocaleProvider>
            </Provider>
        );
    }
}

export default App;
