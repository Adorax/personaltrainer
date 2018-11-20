import {combineReducers} from 'redux';
//import {reducer as formReducer} from 'redux-form';

import favoriteReducer from './favoriteReducer';


//combines all reducers and exports them
const rootReducer = () => (
  combineReducers({
    favoriteReducer,
    //add every reducer here ...
    
    //form:formReducer,  <-- form reducer
  })
);

export default rootReducer;
