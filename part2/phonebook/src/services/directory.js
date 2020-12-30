import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = person => {
  const request = axios.post(baseUrl, person)
  return request.then(response => response.data)
};

const update = (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then(response => response.data);
};

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove };
