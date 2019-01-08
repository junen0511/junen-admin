import { GET_ARTICLE_LIST, EDIT_INITIAL_ARTICLE, DEL_ARTICLE } from './actionTypes';

const initialState = {
    articleList: [],
    total: 0,
    currentItem: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ARTICLE_LIST:
            const { list: articleList, total } = payload;
            return { ...state, articleList, total };
        case EDIT_INITIAL_ARTICLE:
            return { ...state, currentItem: payload };
        case DEL_ARTICLE:
            return { ...state, articleList: state.articleList.filter(({ id }) => id !== payload.id) };
        default:
            return state;
    }
};
