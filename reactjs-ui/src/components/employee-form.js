import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class EmployeeForm extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.initialValues !== prevProps.initialValues) {
      this.props.initialize(this.props.initialValues);
    }
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <small className="form-text small text-danger">{error}</small>;
    }
    return null;
  }

  renderInput = ({ input, label, meta }) => {
    const className = classnames('form-control', {
      'is-invalid': meta.touched && meta.error,
    });

    // Manual way to add class to input
    // const inputClassName = 'form-control ' + (meta.touched && meta.error ? 'is-invalid' : '');
    return (
      <div className="form-group py-2">
        <label>
          <b>{label}</b>
        </label>
        <input {...input} className={className} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  Form = () => (
    <>
      <h3>
        <b>{this.props.formTitle}</b>
      </h3>
      <br />
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
        <div className="d-flex justify-content-between">
          <div className="pt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <Link
              className="btn btn-secondary"
              to="/crud"
              role="button"
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </Link>
          </div>
          {this.props.showDelete && (
            <div className="pt-2">
              <Link
                className="btn btn-danger"
                to="/crud"
                role="button"
                onClick={this.props.onClickDelete}
              >
                Delete
              </Link>
            </div>
          )}
        </div>
      </form>
    </>
  );

  render() {
    return <this.Form />;
  }
}

const validateForm = (values) => {
  const errors = {};
  const msgGeneric = 'This field cannot be empty';

  if (!values.first_name || (values.first_name && !values.first_name.trim())) {
    errors.first_name = msgGeneric;
  }
  if (!values.last_name || (values.last_name && !values.last_name.trim())) {
    errors.last_name = msgGeneric;
  }
  if (!values.job_title || (values.job_title && !values.job_title.trim())) {
    errors.job_title = msgGeneric;
  }

  return errors;
};

export default reduxForm({
  form: 'employee_form',
  fields: ['first_name', 'last_name', 'job_title'],
  validate: validateForm,
  enableReinitialize: true,
})(EmployeeForm);
