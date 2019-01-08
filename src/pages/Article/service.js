import request from '@src/utils/request';

export async function fetchArticleList(data) {
    const response = await request({
        url: '/article/getList',
        method: 'post',
        data
    });

    return response.data;
}

export async function fetchArticleInfo(params) {
    const response = await request({
        url: '/article/getOneInfo',
        method: 'get',
        params
    });

    return response.data;
}

export async function createArticle(data) {
    const response = await request({
        url: '/article/create',
        method: 'post',
        data
    });

    return response.data;
}

export async function updateArticle(data) {
    const response = await request({
        url: '/article/update',
        method: 'post',
        data
    });

    return response.data;
}

export async function deleteArticle(params) {
    const response = await request({
        url: '/article/delete',
        method: 'delete',
        params
    });

    return response.data;
}
