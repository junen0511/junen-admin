import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: '工作台',
                path: 'workplace'
            }
        ]
    },
    {
        name: '栏目管理',
        icon: 'profile',
        path: 'column',
        children: [
            {
                name: '栏目列表',
                path: 'list'
            }
        ]
    },
    {
        name: '文章管理',
        icon: 'file-text',
        path: 'article',
        children: [
            {
                name: '文章列表',
                path: 'list'
            },
            {
                name: '添加文章',
                path: 'add',
                hideInMenu: true
            },
            {
              name: '编辑文章',
              path: 'edit',
              hideInMenu: true
          }
        ]
    }
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
