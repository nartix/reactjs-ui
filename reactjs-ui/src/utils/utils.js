export const genericFilter = (array, filters) =>
  array.filter((item) =>
    Object.keys(filters).every(
      (key) => !filters[key] || item?.[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
    )
  );

export const genericSort = (Entities, sortKey, sortOrder) =>
  Entities.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    if (typeof a[sortKey] === 'string') {
      return (a[sortKey] || '').localeCompare(b[sortKey] || '') * order;
    } else if (typeof a[sortKey] === 'number' || a[sortKey] instanceof Date) {
      return (a[sortKey] - b[sortKey]) * order;
    }
    return 0;
  });

// export const genericSort = (employeeEntities, sortKey, sortOrder = 'asc') =>
//   [...employeeEntities].sort((a, b) => {
//     if (typeof a[sortKey] === 'string') {
//       const compareResult = (a[sortKey] || '').localeCompare(b[sortKey] || '');
//       return sortOrder === 'asc' ? compareResult : -compareResult;
//     } else if (typeof a[sortKey] === 'number' || a[sortKey] instanceof Date) {
//       return sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
//     }
//     return 0;
//   });
