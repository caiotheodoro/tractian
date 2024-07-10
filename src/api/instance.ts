import Axios, { AxiosInstance } from 'axios';

function getCommonHeaders () {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'accept': 'application/json',
  };
};


const instance: AxiosInstance = Axios.create({
  baseURL: 'https://fake-api.tractian.com/',
  headers: getCommonHeaders(),
  timeout: 30000,
});

 function getInstance (): AxiosInstance {
  return instance;
}

export {getInstance}