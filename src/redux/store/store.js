import postsReducer from "../slice/postsSlice";
import { configureStore } from '@reduxjs/toolkit';
const logger = require('redux-logger').createLogger()

const store = configureStore({
    reducer: postsReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

});

export default store;
