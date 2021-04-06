import api from './Api';
const fetchData = async () => {
  const { data } = await api.get('/');
  return data;
};
export default fetchData;
