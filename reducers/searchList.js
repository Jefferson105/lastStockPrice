import { SEARCH_SYMBOLS } from "../actions/actionTypes";

export const initialData = [];

const searchReducer = (state = initialData, { type, data }) => {
    switch (type) {
        case SEARCH_SYMBOLS:
            return {
                ...state,
                searchList: data
            }

        default:
            return state;
    }
};

export default searchReducer;