import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const registerCheck = async (reqData: any) => {
  console.log('registerCheck ~ reqData ~', reqData);
  try {
    const baseurl = server_url.authMail_check;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~registerAuthMailCheck ~ response ~', response.data);
    return response.data;
  } catch (e) {
    console.log('registerAuthMailCheck ~ error ~ ', e);
  }
};

export const registerUser = async (reqData: any) => {
  try {
    const baseurl = server_url.register;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~~registerUser response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~~~~~~registerUser API error ~~~~~~~', e);
  } // 계정생성
};

export const checkId = async (reqData: any) => {
  try {
    const baseurl = server_url.idCheck;
    const response = await axios.post(baseurl, reqData);
    console.log('~~~~checkId response', response.data.success);
    return response.data.success;
  } catch (e) {
    console.log('~~~~~~~~checkId API error ~~~~~~~', e);
  } // id 중복 여부 체크
};

export const getChattingRoom = async () => {
  try {
    const baseurl = server_url.getChattingRoom;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    console.log('token', userInfo.token.accessToken);
    const response = await axios.get(baseurl, {
      headers: {
        authorization: userInfo.token.accessToken,
      },
    });
    console.log('serverAPI.ts ~ getChattingRoom ~ response~ ', response.data);
    return response.data;
  } catch (e) {
    console.log('serverAPI.ts ~ getChattingRoom ~ error~ ', e);
  }
};

export const createChattingRoom = async (data: any) => {
  try {
    const baseurl = server_url.createChattingRoom;
    const value: any = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    const response = await axios.post(
      baseurl,
      {
        startingPoint: data.startingPoint,
        arrivalPoint: data.arrivalPoint,
        startingTime: data.startingTime,
        userID: data.userID,
      },
      {
        headers: {
          authorization: userInfo.token.accessToken,
        },
      },
    );
    return response;
  } catch (e) {
    console.log('serverAPI.ts ~ createChattingRoom ~ error ', e);
  }
};

// 할 일(기록용)
// success false => access + Refresh Token post
// alert => modal (알림 추가)
// 채팅 로그인 여부 상관없이 등장
// 채팅 결합
// 설정
