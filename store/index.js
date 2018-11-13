import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from "../reducers";
import { socketConnection } from "../utils";

export const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ socket: socketConnection() }))));
}