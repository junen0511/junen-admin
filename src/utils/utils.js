import { parse, stringify } from 'qs';

function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn('Two path are equal!');
        return;
    }
    const arr1 = str1.split('/');
    const arr2 = str2.split('/');
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    } else if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    } else {
        return 3;
    }
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i++) {
        // remove repeat
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
        // dose it include
        const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}

export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(routerPath => routerPath.indexOf(path) === 0 && routerPath !== path);
    // Replace path to '' eg. path='/user' /user/name => /name
    routes = routes.map(item => item.replace(path, ''));
    // console.log(456, routes);
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);

    const renderRoutes = renderArr.map(item => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`
        };
    });

    return renderRoutes;
}

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

function getChildrenNodes(pid, treeData) {
    const childrenNodes = treeData.filter(item => pid === item.pid);
    return childrenNodes.map(({ name: title, id }) => ({
        title,
        value: `${id}`,
        key: `${id}`
    }));
}

export function formatTreeData(treeData) {
    if (!Array.isArray(treeData)) {
        throw new Error('arguments is not array');
    }
    let dataSource = [
        {
            title: '顶级栏目',
            value: '0',
            key: '0'
        }
    ];

    const fillChildrenData = childrenData => {
        for (const item of childrenData) {
            if (!item.children) {
                const childrenNodes = getChildrenNodes(parseInt(item.value, 10), treeData);
                if (childrenNodes.length > 0) {
                    item.children = childrenNodes;
                }
            }
            if (item.children && item.children.length > 0) {
                fillChildrenData(item.children);
            }
        }
    };

    fillChildrenData(dataSource);

    return dataSource;
}
