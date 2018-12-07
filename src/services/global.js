export async function queryNotices() {
    const response = await fetch({
        url: '/notices',
        method: 'get',
        data
    });

    return response.data;
}
