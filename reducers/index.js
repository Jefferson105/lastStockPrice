import { combineReducers } from 'redux';

import company from "./company";
import searchList from "./searchList";
import companiesList from "./companiesList";

const rootReducer = combineReducers({ 
    company, 
    searchList, 
    companiesList 
});

export default rootReducer;