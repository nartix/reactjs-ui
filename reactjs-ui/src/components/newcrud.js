import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createEmployee } from '../actions';
import { Navigate, useNavigate } from 'react-router-dom';

class NewCRUD extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="form-text text-muted">{error}</small>;
    }
  }

  renderInput = ({ input, label, meta }) => {
    const inputClassName =
      'form-control ' + (meta.touched && meta.error ? 'is-invalid' : '');
    return (
      <div className="form-group py-2">
        <label>{label}</label>
        <input {...input} className={inputClassName} />
        {this.renderError(meta)}
      </div>
    );
  };

  Form = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
      this.props.createEmployee(formData).then((d) => {
        navigate('/crud');
      });
    };

    return (
      <div>
        <h3>
          <b>Create Employee</b>
        </h3>
        <br />
        <form onSubmit={this.props.handleSubmit(handleSubmit)}>
          <Field
            name="first_name"
            label="First Name"
            component={this.renderInput}
          />
          <Field
            name="last_name"
            label="Last Name"
            component={this.renderInput}
          />
          <Field
            name="job_title"
            label="Job Title"
            component={this.renderInput}
          />
          <div className="pt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <this.Form />;
  }
}

const validate = ({ first_name, last_name, job_title }) => {
  const error = {};
  const msgGeneric = 'This field cannot be empty';

  if (!first_name || (first_name && !first_name.trim())) {
    error.first_name = msgGeneric;
  }
  if (!last_name || (last_name && !last_name.trim())) {
    error.last_name = msgGeneric;
  }
  if (!job_title || (job_title && !job_title.trim())) {
    error.job_title = msgGeneric;
  }

  return error;
};

const form = reduxForm({
  form: 'newcrud', // a unique name for this form
  fields: ['first_name', 'last_name', 'job_title'], // all the fields in your form
  validate,
})(NewCRUD);

export default connect(null, { createEmployee })(form);
