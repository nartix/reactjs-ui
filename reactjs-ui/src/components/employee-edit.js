import _ from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchEmployee, editEmployee, deleteEmployee } from '../actions';
import { useGlobalState } from '../context/global-context-use';
import EmployeeForm from './employee-form';
import { getApiError, getEmployeeById } from '../selectors/employee-selectors';
import Loading from './loading';

// For this instance, I'm using a functional component instead of a class component
// EmployeeList uses a class component, so I wanted to show the difference

function EditEmployee() {
  const { employee_id } = useParams();
  const employee = useSelector((state) =>
    getEmployeeById(state.reducers.employees, Number(employee_id))
  );
  const error = useSelector((state) => getApiError(state.reducers.employees));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [templateGlobals] = useGlobalState();

  useEffect(() => {
    dispatch(fetchEmployee(employee_id));

    document.title = templateGlobals.getPageTitle() + 'CRUD | Edit Employee | ' + employee_id;
  }, [employee_id, dispatch, templateGlobals]);

  const handleSubmit = (formData) => {
    dispatch(editEmployee(employee_id, formData))
      .then(() => {
        navigate('/crud');
      })
      .catch((err) => {
        // API call failed
        console.log(err);
      });
  };

  const handleDelete = () => {
    dispatch(deleteEmployee(employee_id));
  };

  const employeeSelected = _.pick(employee, 'first_name', 'last_name', 'job_title');

  if (error && error.source === 'fetchEmployee') {
    return <div className="alert alert-danger mt-3">An error occurred: {error.message}</div>;
  }

  if (!employee) {
    return <Loading />;
  }

  return (
    <>
      {employee ? (
        <EmployeeForm
          initialValues={employeeSelected}
          onSubmit={handleSubmit}
          formTitle="Edit Employee"
          showDelete={true}
          onClickDelete={handleDelete}
        />
      ) : (
        <div className="alert alert-danger mt-3">Employee not found!</div>
      )}
    </>
  );
}

export default EditEmployee;
