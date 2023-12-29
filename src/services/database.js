import axios from 'axios';

const instance = axios.create({
  baseURL:'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
})

export function getDatabaseData(params){
    return instance.post('/database/getDatabaseData',params)
}
export function getFieldData(database,tableName){
    return instance.get(`/database/${database}/${tableName}`)
}
