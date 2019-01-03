import { GET_COLUMN_LIST, EDIT_INITIAL_COLUMN, DEL_COLUMN } from './actionTypes';

const initialState = {
    columnList: [],
    currentItem: {}
};

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_COLUMN_LIST:
            return { ...state, columnList: payload };
        case EDIT_INITIAL_COLUMN:
            return { ...state, currentItem: payload };
        case DEL_COLUMN:
            return { ...state, columnList: state.columnList.filter(item => item.id !== payload.id) };
        default:
            return state;
    }
};
