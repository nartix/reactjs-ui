import { combineReducers } from '@reduxjs/toolkit';
import employeesReducer from './employees-reducer';
// add more reducers here

export default combineReducers({
  employees: employeesReducer,
});
