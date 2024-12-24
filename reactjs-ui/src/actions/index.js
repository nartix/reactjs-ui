import * as actionTypes from '../types/action-types';
import apiServer from '../apis/api-server';

const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await apiServer.get('/employees');
    dispatch({
      type: actionTypes.FETCH_EMPLOYEES,
      payload: response.data,
    });
  } catch (error) {
    console.log('Error fetching employees:', error);
    dispatch({
      type: actionTypes.API_ERROR,
      payload: {
        message: error.message,
        name: error.name,
        code: error.code,
        source: 'fetchEmployees',
      },
    });
  }
};

const fetchEmployee = (employee_id) => async (dispatch) => {
  try {
    const response = await apiServer.get(`/employees/${employee_id}`);
    dispatch({ type: actionTypes.FETCH_EMPLOYEE, payload: response.data });
  } catch (error) {
    dispatch({
      type: actionTypes.API_ERROR,
      payload: {
        message: error.message,
        name: error.name,
        code: error.code,
        source: 'fetchEmployee',
      },
    });
  }
};

const createEmployee = (formValues) => async (dispatch) => {
  try {
    const response = await apiServer.post('/employees', formValues);
  } catch (error) {
    console.error('Error creating employee:', error);
    // Additional error handling can be added here if needed
  }
};

const editEmployee = (employee_id, formValues) => async (dispatch) => {
  try {
    const response = await apiServer.patch(`/employees/${employee_id}`, formValues);
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: response.data });
  } catch (error) {
    console.error('Error editing employee:', error);
    // Handle error
  }
};

const deleteEmployee = (employee_id) => async (dispatch) => {
  try {
    await apiServer.delete(`/employees/${employee_id}`);
    dispatch({ type: actionTypes.DELETE_EMPLOYEE, payload: employee_id });
  } catch (error) {
    console.error('Error deleting employee:', error);
    // Handle error
  }
};

export { fetchEmployees, fetchEmployee, createEmployee, editEmployee, deleteEmployee };
