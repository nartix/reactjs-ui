import { omit } from 'lodash';

const genericReducer = (config) => {
  const {
    idAttribute = 'id', // Defaulting to 'id', but this can be any attribute name
    actionTypes, // Object of action types. Example: { FETCH: 'FETCH_ITEMS', CREATE: 'CREATE_ITEM', ... }
  } = config;

  const initialState = {
    ids: [], // Maintains order of items
    entities: {},
    error: null,
    errorSource: null,
  };

  return (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case actionTypes.FETCH: {
        const newEntities = payload.reduce((acc, item) => ({ ...acc, [item[idAttribute]]: item }), {});
        const newIds = payload.map((item) => item[idAttribute]);
        return { ...state, entities: newEntities, ids: newIds };
      }
      case actionTypes.SINGLE_FETCH:
      case actionTypes.CREATE:
      case actionTypes.EDIT: {
        const itemId = payload[idAttribute];
        return {
          ...state,
          ids: [...new Set([...state.ids, itemId])],
          entities: {
            ...state.entities,
            [itemId]: payload,
          },
        };
      }
      case actionTypes.DELETE:
        return {
          ...state,
          ids: state.ids.filter((id) => id !== Number(payload)),
          entities: omit(state.entities, payload),
        };
      case actionTypes.API_ERROR:
        return {
          ...state,
          error: payload,
          errorSource: payload.actionType || null,
        };
      default:
        return state;
    }
  };
};

export default genericReducer;

// will maintain order, but harder to work with
// const employeesReducer = (state = [], action) => {
//   switch (action.type) {
//     case actionTypes.FETCH_EMPLOYEES:
//       return [...action.payload];
//     case actionTypes.FETCH_EMPLOYEE:
//       if (state.length === 0) {
//         return [action.payload];
//       }
//       return state.map((employee) =>
//         employee.employee_id === Number(action.payload.employee_id)
//           ? action.payload
//           : employee
//       );

//     // case actionTypes.FETCH_EMPLOYEE:
//     //   console.log('FETCH_EMPLOYEE reducer:', action.payload);
//     //   const index = state.findIndex(
//     //     (employee) =>
//     //       employee.employee_id === Number(action.payload.employee_id)
//     //   );
//     //   if (index > -1) {
//     //     const newState = [...state];
//     //     newState[index] = action.payload;
//     //     console.log('FETCH_EMPLOYEE newState:', newState);
//     //     return newState;
//     //   } else {
//     //     console.log('FETCH_EMPLOYEE state:', [...state, action.payload]);
//     //     return [...state, action.payload];
//     //   }
//     case actionTypes.CREATE_EMPLOYEE:
//       return [...state, action.payload];
//     case actionTypes.EDIT_EMPLOYEE:
//       return state.map((employee) =>
//         employee.employee_id === Number(action.payload.employee_id)
//           ? action.payload
//           : employee
//       );
//     case actionTypes.DELETE_EMPLOYEE:
//       return state.filter(
//         (employee) => employee.employee_id !== Number(action.payload)
//       );
//     // case actionTypes.DELETE_EMPLOYEE:
//     //   const deleteIndex = state.findIndex(
//     //     (employee) => employee.employee_id === Number(action.payload)
//     //   );
//     //   if (deleteIndex > -1) {
//     //     const newState = [...state];
//     //     newState.splice(deleteIndex, 1);
//     //     return newState;
//     //   } else {
//     //     return state;
//     //   }
//     case actionTypes.API_ERROR:
//       return [
//         ...state,
//         { error: action.payload.error, errorSource: action.payload.source },
//       ];
//     default:
//       return state;
//   }
// };

// will not maintain order, but super easy to work with
// const employeesReducer = (state = {}, action) => {
//   switch (action.type) {
//     case actionTypes.FETCH_EMPLOYEES:
//       console.log('FETCH_EMPLOYEES', _.mapKeys(action.payload, 'employee_id'));
//       return { ...state, ..._.mapKeys(action.payload, 'employee_id') };
//     case actionTypes.FETCH_EMPLOYEE:
//       return { ...state, [action.payload.employee_id]: action.payload };
//     case actionTypes.CREATE_EMPLOYEE:
//       return { ...state, [action.payload.employee_id]: action.payload };
//     case actionTypes.EDIT_EMPLOYEE:
//       return { ...state, [action.payload.employee_id]: action.payload };
//     case actionTypes.DELETE_EMPLOYEE:
//       return _.omit(state, action.payload);
//     case actionTypes.API_ERROR:
//       return {
//         ...state,
//         error: action.payload.error,
//         errorSource: action.payload.source,
//       };
//     default:
//       return state;
//   }
// };

// export default employeesReducer;
