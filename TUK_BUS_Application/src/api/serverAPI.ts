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

export const loginUser = async (reqData: any) => {
  try {
    const baseurl = server_url.login;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~~loginUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~loginUser API error ~~~~~~~', e);
  }
};

//임시
// export const registerUser = async (reqData: any) => {
//   try {
//     const baseurl = server_url.login;
//     const response = await axios.post(baseurl, reqData);
//     console.log('~~~~registerUser response', response.data);
//     return response.data;
//   } catch (e) {
//     console.log('~~~~~~~~registerUser API error ~~~~~~~', e);
//   }
// };

export const registerAuthMail = async (reqData: any) => {
  console.log('registerAuthMail ~ reqData ~ ', reqData);
  try {
    const baseurl = server_url.register_authMail;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~registerAuthMail ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('registerAuthmMail ~ error ~ ', e);
  }
};

export const registerAuthMailCheck = async (reqData: any) => {
  console.log('registerAuthMailCheck ~ reqData ~', reqData);
  try {
    const baseurl = server_url.authMail_check;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~registerAuthMailCheck ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('registerAuthMailCheck ~ error ~ ', e);
  }
};
