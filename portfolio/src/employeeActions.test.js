import { environment } from './globals';
const fetch = require('node-fetch');

const fetchEmployee = async (employeeId) => {
  const response = await fetch(
    `${environment.EXPRESSJS_URL}/employees/${employeeId}`
  );
  const data = await response.json();
  return data;
};

jest.mock('node-fetch');

describe('fetchEmployee', () => {
  it('returns the user data', async () => {
    const employeeId = 135;
    const mockResponse = { name: 'example' };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await fetchEmployee(employeeId);

    expect(fetch).toHaveBeenCalledTimes(1);

    expect(fetch).toHaveBeenCalledWith(
      `${environment.EXPRESSJS_URL}/employees/${employeeId}`
    );

    expect(result).toEqual(mockResponse);
  });
});
