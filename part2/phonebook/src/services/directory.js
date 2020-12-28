import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
};

const update = (newPerson) => {
  const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson);
  return request.then(response => response.data);
  //   return axios.put(`${baseUrl}/${id}`, newPerson)
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove };
