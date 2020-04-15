import {applyMiddleware, combineReducers, createStore} from "redux";
import ws from "./ws";
import reduxThunk from 'redux-thunk'
import middleware from "./middleware/middleware";

export const configureStore = () => {
    const rootReducer = combineReducers({ws});
    return createStore(rootReducer, applyMiddleware(reduxThunk, middleware));
};
