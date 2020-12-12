import axios from 'axios';
const baseUrl = '/.netlify/functions/api/resources';

const getAll = function() {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = function(newObject) {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
}

const update = function(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

export default { getAll, create, update };
