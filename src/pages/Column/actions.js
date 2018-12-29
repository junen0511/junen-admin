import { message } from 'antd';
import { fetchColumnList, fetchColumnInfo, updateColumn, deleteColumn } from './service';
import { DEL_COLUMN, GET_COLUMN_INFO, GET_COLUMN_LIST } from './actionTypes';

export const getColumnList = payload => {
    return async dispatch => {
        try {
            const { status, data } = await fetchColumnList(payload);
            if (status) {
                dispatch({
                    type: GET_COLUMN_LIST,
                    payload: data
                });
            }
        } catch (error) {}
    };
};

export const getColumnInfo = payload => {
    return async dispatch => {
        const { status, data } = await fetchColumnInfo(payload);
        if (status) {
            dispatch({
                type: GET_COLUMN_INFO,
                payload: data
            });
        }
        try {
        } catch (error) {}
    };
};

export const addColumn = payload => {
    return async () => {
        try {
            const { status } = await updateColumn(payload);
            if (status) {
                message.success('提交成功');
            }
        } catch (error) {}
    };
};

export const editColumn = payload => {
    return async () => {
        try {
            const { status } = await updateColumn(payload);
            if (status) {
                message.success('编辑成功');
            }
        } catch (error) {}
    };
};

export const delColumn = payload => {
    return async dispatch => {
        try {
            const { status } = await deleteColumn(payload);
            if (status) {
                dispatch({
                    type: DEL_COLUMN,
                    payload
                });
            }
        } catch (error) {}
    };
};
