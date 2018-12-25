import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import GlobalHeader from 'components/GlobalHeader';
import GlobalFooter from 'components/GlobalFooter';
import SiderMenu from 'components/SiderMenu';
import NotFound from '@src/pages/Exception/404';
import { getRoutes } from '@src/utils/utils';
import Authorized from '@src/utils/Authorized';
import { getMenuData } from '@src/common/menu';
import logo from '@src/assets/logo.svg';
import { updateLayoutCollapsed } from './actions';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;

const redirectData = [];
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `${item.path}`,
                to: `${item.children[0].path}`
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};

getMenuData().forEach(getRedirect);

const getBreadcrumbNameMap = (menuData, routerData) => {
    const result = {};
    const childResult = {};
    for (const i of menuData) {
        if (!routerData[i.path]) {
            result[i.path] = i;
        }
        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
        }
    }
    return { ...routerData, ...result, ...childResult };
};

const query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599
    },
    'screen-xxl': {
        minWidth: 1600
    }
};

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

class BasicLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object
    };

    state = {
        isMobile
    };

    getChildContext() {
        const { routerData, location } = this.props;
        return {
            location,
            breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData)
        };
    }

    componentDidMount() {
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
                isMobile: mobile
            });
        });
    }

    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
    }

    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = 'Junen CMS';
        let currRouterData = null;
        // match params path
        for (const key in routerData) {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key];
                break;
            }
        }
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name} - Junen CMS`;
        }
        return title;
    }

    getBaseRedirect = () => {
        const urlParams = new URL(window.location.href);
        const redirect = urlParams.searchParams.get('redirect');
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            const { routerData } = this.props;
            // get the first authorized route path in routerData
            const authorizedPath = Object.keys(routerData).find(
                item => check(routerData[item].authority, item) && item !== '/'
            );
            return authorizedPath;
        }
        return redirect;
    };

    handleMenuCollapse = collapsed => {
        const { changeLayoutCollapsed } = this.props;
        changeLayoutCollapsed({ collapsed });
    };

    handleMenuClick = ({ key }) => {};

    render() {
        const { collapsed, routerData, location, match } = this.props;
        const { isMobile: mb } = this.state;
        const baseRedirect = this.getBaseRedirect();
        const layout = (
            <Layout>
                <SiderMenu
                    logo={logo}
                    menuData={getMenuData()}
                    location={location}
                    isMobile={mb}
                    collapsed={collapsed}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            logo={logo}
                            isMobile={mb}
                            collapsed={collapsed}
                            onCollapse={this.handleMenuCollapse}
                            onMenuClick={this.handleMenuClick}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                            {redirectData.map(item => (
                                <Redirect key={item.from} exact from={item.from} to={item.to} />
                            ))}
                            {getRoutes(match.path, routerData).map(item => (
                                <AuthorizedRoute
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                    authority={item.authority}
                                    redirectPath="/exception/403"
                                />
                            ))}

                            <Redirect exact from="/" to={baseRedirect} />
                            <Route render={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        <GlobalFooter
                            links={[
                                {
                                    key: 'github',
                                    title: <Icon type="github" />,
                                    href: 'https://github.com/ant-design/ant-design-pro',
                                    blankTarget: true
                                }
                            ]}
                            copyright={
                                <Fragment>
                                    Copyright <Icon type="copyright" /> 2018 2X3 2X3 2X3
                                </Fragment>
                            }
                        />
                    </Footer>
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    collapsed: state.global.collapsed
});

const mapDispatchToProps = dispatch => ({
    changeLayoutCollapsed: payload => {
        dispatch(updateLayoutCollapsed(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicLayout);
