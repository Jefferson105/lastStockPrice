import { SET_INFO_COMPANY, LOADING_COMPANY, UPDATE_INFO_COMPANY, SET_GRAPH_DATA, } from "../actions/actionTypes";

export const initialData = {
    loading: false,
    graphData: null,
    info: null
};

const companyReducer = (state = initialData, { type, data }) => {
    switch (type) {
        case LOADING_COMPANY:
            return {
                ...state,
                loading: true
            }
        
        case SET_INFO_COMPANY:
            return {
                ...state,
                loading: false,
                info: data
            }

        case UPDATE_INFO_COMPANY:
            return {
                ...state,
                info: {
                    ...state.info,
                    ...data
                }
            }

        case SET_GRAPH_DATA:
            return {
                ...state,
                graphData: data
            }
        
        default:
            return state;
    }
}

export default companyReducer;