import genericReducer from './generic-reducer';
import * as actionTypes from '../types/action-types';

const employeesReducer = genericReducer({
  idAttribute: 'employee_id',
  actionTypes: {
    FETCH: actionTypes.FETCH_EMPLOYEES,
    SINGLE_FETCH: actionTypes.FETCH_EMPLOYEE,
    CREATE: actionTypes.CREATE_EMPLOYEE,
    EDIT: actionTypes.EDIT_EMPLOYEE,
    DELETE: actionTypes.DELETE_EMPLOYEE,
    API_ERROR: actionTypes.API_ERROR,
  },
});

export default employeesReducer;
