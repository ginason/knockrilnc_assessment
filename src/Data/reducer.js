import { combineReducers } from 'redux';
import { homeReducer } from './Home/reducer';

export const reducer = combineReducers({
    home: homeReducer,
});
