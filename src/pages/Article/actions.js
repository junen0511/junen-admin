import { GET_ARTICLE_LIST, GET_ARTICLE_INFO, DEL_ARTICLE } from './actionTypes';
import { fetchArticleList, fetchArticleInfo, createArticle, updateArticle, deleteArticle } from './service';
import { message } from 'antd';

export const getArticleList = queryForm => {
    return async dispatch => {
        try {
            const { status, data } = await fetchArticleList(queryForm);
            if (status) {
                const { list, total } = data;
                dispatch({
                    type: GET_ARTICLE_LIST,
                    payload: {
                        total,
                        list
                    }
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const getArticleInfo = queryForm => {
    return async dispatch => {
        try {
            const { status, data } = await fetchArticleInfo(queryForm);
            if (status) {
                dispatch({
                    type: GET_ARTICLE_INFO,
                    payload: data
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const addArticle = payload => {
    return async () => {
        try {
            const { status, message: result } = await createArticle(payload);
            if (status) {
                message.success('提交成功！');
            } else {
                message.error(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const editArticle = payload => {
    return async () => {
        try {
            const { status, message: result } = await updateArticle(payload);
            if (status) {
                message.success('编辑成功！');
            } else {
                message.error(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const delArticle = payload => {
    return async dispatch => {
        try {
            const { status, message: result } = await deleteArticle(payload);
            if (status) {
                dispatch({
                    type: DEL_ARTICLE,
                    payload
                });
            } else {
                message.error(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};
