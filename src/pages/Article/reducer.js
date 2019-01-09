import { GET_ARTICLE_LIST, GET_ARTICLE_INFO, DEL_ARTICLE } from './actionTypes';

const initialState = {
    articleList: [],
    total: 0,
    articleInfo: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ARTICLE_LIST:
            const { list: articleList, total } = payload;
            return { ...state, articleList, total };
        case GET_ARTICLE_INFO:
            return { ...state, articleInfo: payload };
        case DEL_ARTICLE:
            return { ...state, articleList: state.articleList.filter(({ id }) => id !== payload.id) };
        default:
            return state;
    }
};
