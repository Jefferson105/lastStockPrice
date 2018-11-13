import { SET_COMPANIES_LIST } from "../actions/actionTypes";

export const initialData = {};

const companyReducer = (state = initialData, { type, data }) => {
    switch (type) {
        case SET_COMPANIES_LIST:
            return {
                ...state,
                companiesList: data
            }

        default:
            return state;
    }
};

export default companyReducer;