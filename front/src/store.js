import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
];

/*if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
    /*const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
}*/

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 20180531*/
    /*...enhancers.push(devToolsExtension())*/
);

const store = createStore(
    rootReducer,    
    initialState,
    composedEnhancers
);

export default store;