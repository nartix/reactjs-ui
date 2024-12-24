import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions'; // Update this path
import * as actionTypes from './types/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

it('creates FETCH_EMPLOYEE after successfully fetching an employee', () => {
  const mockEmployee = {
    employee_id: 135,
    first_name: 'aaa',
    last_name: 'aaa',
    job_title: 'aaa',
  };

  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: mockEmployee,
    });
  });

  const expectedActions = [
    {
      type: actionTypes.FETCH_EMPLOYEE,
      payload: mockEmployee,
    },
  ];

  const store = mockStore({ employees: {} });

  return store.dispatch(actions.fetchEmployee(135)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
