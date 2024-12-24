import { createSelector } from 'reselect';
import { genericFilter, genericSort } from '../utils/utils';

const getIds = (state) => state.ids;
const getEntities = (state) => state.entities;
const getEntitiesArray = (state) => state;
const getError = (state) => state.error;

// Using reselect to create memoized selectors
const getAllEmployees = createSelector([getIds, getEntities], (ids, entities) => ids.map((id) => entities[id]));

const getEmployeeById = createSelector(
  [getEntities, (state, employeeId) => employeeId],
  (entities, employeeId) => entities[employeeId] || null
);

const getApiError = createSelector([getError], (error) => error || null);

const getSortedEmployeesByUpdatedAt = createSelector([getAllEmployees], (employees) =>
  [...employees].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
);

// const getSortedEmployees = createSelector(
//   [getEntitiesArray],
//   (employees) => (sortKey) => {
//     const sortedEmployees = [...employees].sort((a, b) =>
//       (a[sortKey] || '').localeCompare(b[sortKey] || '')
//     );
//     return sortedEmployees;
//   }
// );

// const getSortedEmployees = createSelector(
//   [getEntitiesArray],
//   (employees) =>
//     (sortKey, sortOrder = 'asc') => {
//       const sortedEmployees = [...employees].sort((a, b) => {
//         const compareResult = (a[sortKey] || '').localeCompare(
//           b[sortKey] || ''
//         );
//         return sortOrder === 'asc' ? compareResult : -compareResult;
//       });
//       return sortedEmployees;
//     }
// );

// const getSortedEmployees = createSelector(
//   [getEntitiesArray],
//   (employeeEntities) =>
//     (sortKey, sortOrder = 'asc') => {
//       if (!employeeEntities[0].hasOwnProperty(sortKey)) {
//         return employeeEntities;
//       }

//       const sortedEmployees = [...employeeEntities].sort((a, b) => {
//         if (typeof a[sortKey] === 'string') {
//           const compareResult = (a[sortKey] || '').localeCompare(
//             b[sortKey] || ''
//           );
//           return sortOrder === 'asc' ? compareResult : -compareResult;
//         } else if (
//           typeof a[sortKey] === 'number' ||
//           a[sortKey] instanceof Date
//         ) {
//           return sortOrder === 'asc'
//             ? a[sortKey] - b[sortKey]
//             : b[sortKey] - a[sortKey];
//         }
//         return 0;
//       });

//       return sortedEmployees;
//     }
// );

// const getSortedEmployees = createSelector(
//   [getEntitiesArray],
//   (employeeEntities) =>
//     (sortKey, sortOrder = 'asc') =>
//       [...employeeEntities].sort((a, b) => {
//         if (typeof a[sortKey] === 'string') {
//           const compareResult = (a[sortKey] || '').localeCompare(b[sortKey] || '');
//           return sortOrder === 'asc' ? compareResult : -compareResult;
//         } else if (typeof a[sortKey] === 'number' || a[sortKey] instanceof Date) {
//           return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
//         }
//         return 0;
//       })
// );

const getSortedEmployees = createSelector(
  [getEntitiesArray],
  (employeeEntities) =>
    (sortKey, sortOrder = 'asc') =>
      genericSort(employeeEntities, sortKey, sortOrder)
);

// create a selector that filters data based this       const filters = {
//   first_name: firstNameFilter,
//   last_name: lastNameFilter,
//   job_title: jobTitleFilter,
// };

const getFilteredEmployees = createSelector(
  [getEntitiesArray],
  (employeeEntities) => (filters) => genericFilter(employeeEntities, filters)
);

export {
  getSortedEmployeesByUpdatedAt,
  getSortedEmployees,
  getAllEmployees,
  getEmployeeById,
  getApiError,
  getFilteredEmployees,
};
