import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.less';
import { urlToList } from '../_utils/pathTools';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//  icon: <Icon type="setting" />
const getIcon = icon => {
    if (typeof icon === 'string') {
        if (icon.indexOf('http') === 0) {
            return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
        }
        return <Icon type={icon} />;
    }

    return icon;
};

export const getFlatMenuKeys = menu =>
    menu.reduce((keys, item) => {
        keys.push(item.path);
        if (item.children) {
            return keys.concat(getFlatMenuKeys(item.children));
        }
        return keys;
    }, []);

export const getMenuMatchKeys = (flatMenuKeys, paths) =>
    paths.reduce((matchKeys, path) => matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))), []);

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.flatMenuKeys = getFlatMenuKeys(props.menuData);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props)
        };
    }

    componentWillReceiveProps(nextProps) {
        const { location } = this.props;
        if (nextProps.location.pathname !== location.pathname) {
            this.setState({
                openKeys: this.getDefaultCollapsedSubMenus(nextProps)
            });
        }
    }

    /**
     * Convert pathname to openKeys
     * /list/search/articles = > ['list','/list/search']
     * @param  props
     */
    getDefaultCollapsedSubMenus(props) {
        const {
            location: { pathname }
        } = props || this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    }

    getMenuItemPath = item => {
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target, name } = item;

        // is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const { location, isMobile, onCollapse } = this.props;
        return (
            <Link
                to={itemPath}
                target={target}
                replace={itemPath === location.pathname}
                onClick={
                    isMobile
                        ? () => {
                              onCollapse(true);
                          }
                        : undefined
                }>
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    // get SubMenu or item
    getSubMenuOrItem = item => {
        if (item.children && item.children.some(child => child.name)) {
            const childrenItems = this.getNavMenuItems(item.children);
            if (childrenItems && childrenItems.length > 0) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                item.name
                            )
                        }
                        key={item.path}>
                        {childrenItems}
                    </SubMenu>
                );
            }
            return null;
        } else {
            return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };

    // get the menu children node
    getNavMenuItems = menusData => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                return this.getSubMenuOrItem(item);
            });
    };

    // get the currently selected menu
    getSelectedMenuKeys = () => {
        const {
            location: { pathname }
        } = this.props;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
    };

    // conversion path
    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        } else {
            return `/${path || ''}`.replace(/\/+/g, '/');
        }
    };

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => key && (item.key === key || item.path === key));
    };

    handleOpenChange = openKeys => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
        });
    };

    render() {
        const { logo, menuData, collapsed, onCollapse } = this.props;
        const { openKeys } = this.state;
        const theme = 'dark';
        const siderClass = classNames(styles.sider, {
            [styles.light]: theme === 'light'
        });
        // Don't show popup menu when it is been collapsed
        const menuProps = collapsed ? {} : { openKeys };

        // if pathname can't match, use the nearest parent's key
        let selectedKeys = this.getSelectedMenuKeys();
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapse}
                width={256}
                className={siderClass}>
                <div className={styles.logo} key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>Junen Blog</h1>
                    </Link>
                </div>
                <Menu
                    key="Menu"
                    theme={theme}
                    mode="inline"
                    {...menuProps}
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={selectedKeys}
                    style={{ padding: '16px 0', width: '100%' }}>
                    {this.getNavMenuItems(menuData)}
                </Menu>
            </Sider>
        );
    }
}
