import { COLLAPSED } from './actionTypes';

export const updateLayoutCollapsed = payload => {
    return {
        type: COLLAPSED,
        payload
    };
};
