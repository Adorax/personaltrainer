// Store/configureStore.js

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


const enhancers= compose(
  applyMiddleware(thunk), // Allow to have function that wraps an expression to delay its evaluation
  window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
);

//create redux store
export const store = createStore(rootReducer(), enhancers);
