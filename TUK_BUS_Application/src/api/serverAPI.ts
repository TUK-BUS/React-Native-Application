import axios, {AxiosResponse} from 'axios';
import {allSchedule, liveSchedule} from '../../types/api/awsapiType';
import {all_schedule_url, server_url} from './url';

export function getUnivSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.goUniv;
  return axios.get(baseurl);
}

export function getHomeSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.goHome;
  return axios.get(baseurl);
}

export function getEntireSchedule(
  day: string,
): Promise<AxiosResponse<allSchedule>> {
  const baseurl = all_schedule_url(day);
  return axios.get(baseurl);
}

export const loginUser = async (reqData: loginBody) => {
  console.log('loginUser param: ', reqData);
  return await axios
    .post(server_url.login, reqData)
    .then(response => {
      console.log('loginUser response: ', response);
      return response.data;
    })
    .catch(error => {
      console.log('loginUser error: ', error);
    });
};

type loginBody = {
  userID: string;
  userPW: string;
};
