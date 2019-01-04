import request from '@src/utils/request';

export async function queryCurrent() {
    const response = await request({
        url: '/user/current',
        method: 'get'
    });

    return response.data;
}
