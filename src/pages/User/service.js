import request from '@src/utils/request';

export async function signInApi(data) {
    const response = await request({
        url: '/user/signIn',
        method: 'post',
        data
    });

    return response.data;
}

export async function signUpApi(data) {
    const response = await request({
        url: '/user/signUp',
        method: 'post',
        data
    });

    return response.data;
}
