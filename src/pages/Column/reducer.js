import { ADD_COLUMN, EDIT_COLUMN, DEL_COLUMN, GET_COLUMN_INFO, GET_COLUMN_LIST } from './actionTypes';

export default (state = {}, action) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_COLUMN:
            return { ...state, ...payload };
        default:
            return state;
    }
};
