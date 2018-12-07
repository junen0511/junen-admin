import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { Provider } from 'unstated';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
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
            <Provider>
                <LocaleProvider locale={zhCN}>
                    <Router history={history}>
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
                    </Router>
                </LocaleProvider>
            </Provider>
        );
    }
}

export default App;
