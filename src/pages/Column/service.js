import request from '@src/utils/request';

export async function fetchColumnList() {
    const response = await request({
        url: '/column/list',
        method: 'get'
    });

    return response.data;
}

export async function fetchColumnInfo(params) {
    const response = await request({
        url: '/column/info',
        method: 'get',
        params
    });

    return response.data;
}

export async function createColumn(data) {
    const response = await request({
        url: '/column/create',
        method: 'post',
        data
    });

    return response.data;
}

export async function updateColumn(data) {
    const response = await request({
        url: '/column/update',
        method: 'post',
        data
    });

    return response.data;
}

export async function deleteColumn(params) {
    const response = await request({
        url: '/column/delete',
        method: 'delete',
        params
    });

    return response.data;
}
