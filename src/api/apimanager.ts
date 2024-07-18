import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://us-central1-teamcore-retail.cloudfunctions.net/test_mobile/api/',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
