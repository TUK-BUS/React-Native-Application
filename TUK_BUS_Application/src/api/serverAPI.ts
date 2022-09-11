import axios, {AxiosResponse} from 'axios';
import {
  allSchedule,
  liveSchedule,
  liveSchedule2,
} from '../../types/api/awsapiType';
import {server_url} from './auth';

export function getUnivSchedule(): Promise<AxiosResponse<liveSchedule>> {
  const baseurl: string = server_url.goUniv;
  return axios.get(baseurl);
}

export function getHomeSchedule(): Promise<AxiosResponse<liveSchedule2>> {
  const baseurl: string = server_url.goHome;
  return axios.get(baseurl);
}

export function getEntireSchedule(): Promise<AxiosResponse<allSchedule>> {
  const baseurl: string = server_url.entire_schedule;
  return axios.get(baseurl);
}
