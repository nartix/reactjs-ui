import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EmployeeForm from './employee-form';
import { createEmployee } from '../actions';

import { GlobalContext } from '../context/global-context';

class CreateEmployee extends React.Component {
  static contextType = GlobalContext;

  componentDidMount() {
    const [templateGlobals] = this.context;
    document.title = templateGlobals.getPageTitle() + 'CRUD | Create Employee';
  }

  Form = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
      this.props.createEmployee(formData).then((d) => {
        navigate('/crud');
      });
    };

    return <EmployeeForm onSubmit={handleSubmit} formTitle="Create Employee" />;
  };

  render() {
    return <this.Form />;
  }
}

export default connect(null, { createEmployee })(CreateEmployee);
