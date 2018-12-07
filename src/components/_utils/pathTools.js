// /user/2018/info => ['/user','/user/2018','/user/2018/info']
export function urlToList(url) {
    const urlList = url.split('/').filter(i => i);
    return urlList.map((urlItem, index) => {
        return `/${urlList.slice(0, index + 1).join('/')}`;
    });
}
