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
