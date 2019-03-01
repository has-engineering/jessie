import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getLeave = id => {
  return instance.get(`/leaves/${id}`);
};

export const createLeave = saveObj => {
  return 'ok';
};
