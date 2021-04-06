import axios from 'axios';

function Api() {
  return axios.create({
    baseURL: 'https://605af4e427f0050017c05b1f.mockapi.io/Players',
  });
}
export default Api();
