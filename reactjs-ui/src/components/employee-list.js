import React from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { fetchEmployees } from '../actions';
import { GlobalContext } from '../context/global-context';
import {
  getSortedEmployees,
  getAllEmployees,
  getApiError,
  getFilteredEmployees,
} from '../selectors/employee-selectors';
import Loading from './loading';

class EmployeesList extends React.Component {
  static contextType = GlobalContext;

  state = {
    firstNameFilter: '',
    lastNameFilter: '',
    jobTitleFilter: '',
    totalEmployees: 0,
    sortBy: null,
    sortOrder: 'asc',
    filteredEmployees: [],
    error: null,
  };

  componentDidMount() {
    this.props.fetchEmployees().then(() => {
      // Once employees are fetched, set them to filteredEmployees.
      this.setState({ filteredEmployees: this.props.employees });
    });

    const [templateGlobals] = this.context;
    document.title = templateGlobals.getPageTitle() + 'CRUD';
  }

  componentDidUpdate(prevProps, prevState) {
    const { employees, error } = this.props;
    const { firstNameFilter, lastNameFilter, jobTitleFilter, sortBy, sortOrder } = this.state;

    if (this.state.filteredEmployees.length !== prevState.totalEmployees) {
      this.setState({ totalEmployees: this.state.filteredEmployees.length });
    }

    const hasErrorChanged = prevProps.error !== error;
    if (hasErrorChanged) {
      this.setState({ error: error });
    }

    const hasPropsChanged = prevProps.employees !== employees;

    const hasFilterChanged =
      prevState.firstNameFilter !== firstNameFilter ||
      prevState.lastNameFilter !== lastNameFilter ||
      prevState.jobTitleFilter !== jobTitleFilter ||
      prevState.sortBy !== sortBy ||
      prevState.sortOrder !== sortOrder;

    if (hasFilterChanged || hasPropsChanged) {
      const filters = {
        first_name: firstNameFilter,
        last_name: lastNameFilter,
        job_title: jobTitleFilter,
      };
      const filtered = getFilteredEmployees(employees)(filters);
      const sortedAndFiltered = getSortedEmployees(filtered)(sortBy, sortOrder);

      this.setState({
        filteredEmployees: sortedAndFiltered,
        totalEmployees: sortedAndFiltered.length,
      });
    }
  }

  RenderEmployees = () => {
    const navigate = useNavigate();

    if (this.state.filteredEmployees.length === 0) {
      return (
        <tr>
          <td colSpan="4" className="text-center">
            No employees found!
          </td>
        </tr>
      );
    }

    return this.state.filteredEmployees.map((employee) => {
      return (
        <tr key={employee.employee_id} onClick={() => navigate(`/employees/edit/${employee.employee_id}`)}>
          <td>
            <Link to={`/employees/edit/${employee.employee_id}`} className="text-decoration-none">
              {employee.first_name}
            </Link>
          </td>
          <td>{employee.last_name}</td>
          <td>{employee.job_title}</td>
          <td>
            <Link to={`/employees/edit/${employee.employee_id}`}>
              <i className="bi bi-pencil-square"></i>
            </Link>
          </td>
        </tr>
      );
    });
  };

  // Render Add Employee button
  AddEmployee = () => {
    return (
      <div className="text-end">
        <Link className="btn btn-primary" to="/employees/create" role="button">
          Create Employee
        </Link>
      </div>
    );
  };

  handleSearchInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  sortEmployeesBy = (sortBy) => {
    const sortOrder = sortBy === this.state.sortBy && this.state.sortOrder === 'asc' ? 'desc' : 'asc';
    this.setState({ sortBy: sortBy, sortOrder: sortOrder });
  };

  renderSortCancel = (columnName) => {
    if (this.state.sortBy === columnName) {
      return (
        <i
          className="bi bi-x-square"
          style={{ marginLeft: '5px', cursor: 'pointer' }}
          onClick={() => this.resetSortBy()}
        ></i>
      );
    }
    return null;
  };

  resetSortBy = () => {
    this.setState({ sortBy: null, sortOrder: 'asc' });
  };

  renderSortIcon = (columnName) => {
    if (this.state.sortBy === columnName) {
      if (this.state.sortOrder === 'asc') {
        return <i className="bi bi-sort-down-alt" style={{ marginRight: '5px' }}></i>;
      }
      return <i className="bi bi-sort-up" style={{ marginRight: '5px' }}></i>;
    }
  };

  render() {
    if (this.state.error && this.state.error.source === 'fetchEmployees') {
      return <div className="alert alert-danger mt-3">An error occurred: {this.state.error.message}</div>;
    }

    if (this.props.employees.length === 0) {
      return <Loading />;
    }

    const TableHeader = ({ columnName, sortOrder, sortFunction, renderSortIcon, renderSortCancel }) => {
      const formattedColumnName = columnName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return (
        <th scope="col" style={{ width: '31%' }}>
          <span onClick={() => sortFunction(columnName)} style={{ textDecoration: 'none', cursor: 'pointer' }}>
            {renderSortIcon(columnName)}
            {formattedColumnName}
          </span>
          {renderSortCancel(columnName)}
        </th>
      );
    };

    return (
      <div>
        <h3>
          <b>Employee List</b>
        </h3>
        <br />
        <this.AddEmployee />

        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <TableHeader
                columnName="first_name"
                sortOrder={this.state.sortOrder}
                sortFunction={this.sortEmployeesBy}
                renderSortIcon={this.renderSortIcon}
                renderSortCancel={this.renderSortCancel}
              />
              <TableHeader
                columnName="last_name"
                sortOrder={this.state.sortOrder}
                sortFunction={this.sortEmployeesBy}
                renderSortIcon={this.renderSortIcon}
                renderSortCancel={this.renderSortCancel}
              />
              <TableHeader
                columnName="job_title"
                sortOrder={this.state.sortOrder}
                sortFunction={this.sortEmployeesBy}
                renderSortIcon={this.renderSortIcon}
                renderSortCancel={this.renderSortCancel}
              />
            </tr>
            <tr>
              <td>
                <input
                  className="form-control"
                  type="text"
                  name="firstNameFilter"
                  value={this.state.firstNameFilter}
                  onChange={this.handleSearchInputChange}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  name="lastNameFilter"
                  value={this.state.lastNameFilter}
                  onChange={this.handleSearchInputChange}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  type="text"
                  name="jobTitleFilter"
                  value={this.state.jobTitleFilter}
                  onChange={this.handleSearchInputChange}
                />
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <this.RenderEmployees />
          </tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
          <div className="text-secondary me-2">Total Employees:</div>
          <div className="fw-bold">{this.state.totalEmployees}</div>
        </div>
        <div className="mt-3 text-muted">
          <small>This employee list supports sorting by column name, order direction, order reset, and search.</small>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchEmployees,
};

const mapStatetoProps = (state) => {
  return {
    employees: getAllEmployees(state.reducers.employees),
    error: getApiError(state.reducers.employees),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(EmployeesList);
