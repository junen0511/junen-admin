import { message } from 'antd';
import { fetchColumnList, createColumn, updateColumn, deleteColumn } from './service';
import { GET_COLUMN_LIST, EDIT_INITIAL_COLUMN, DEL_COLUMN } from './actionTypes';

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
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const addColumn = payload => {
    return async dispatch => {
        try {
            const { status, message: result } = await createColumn(payload);
            if (status) {
                message.success('提交成功');
            } else {
                message.error(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const editColumn = payload => {
    return async dispatch => {
        try {
            const { status, message: result } = await updateColumn(payload);
            if (status) {
                message.success('编辑成功');
            } else {
                message.success(result);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
};

export const editInitialColumn = payload => {
    return {
        type: EDIT_INITIAL_COLUMN,
        payload
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
        } catch (error) {
            throw new Error(error);
        }
    };
};
