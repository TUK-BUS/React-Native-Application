import {futureRouteSearch} from '../../types/api/kakaoapiType';
import moment from 'moment';
import {server_ip} from '../../.env/auth';

export function FutureRouteSearchURL(params: futureRouteSearch): string {
  const baseurl = `https://apis-navi.kakaomobility.com/v1/future/directions?origin=${params.origin}&destination=${params.destination}&departure_time=${params.departure_time}`;

  return baseurl;
}

export function setFutureRouteSearchParams(
  time: string,
  direction: string,
): futureRouteSearch {
  const currentDate =
    moment().format('YYYYMMDD') + time.slice(0, 2) + time.slice(3, 5);

  const params_goUniversity = {
    origin: '126.74163070227455,37.351855271129445',
    destination: '126.7325489990025,37.33957210855494',
    departure_time: currentDate,
  };

  const params_goHome = {
    origin: '126.7325489990025,37.33957210855494',
    destination: '126.74190162742117,37.35101790800419',
    departure_time: currentDate,
  };

  const params = direction === '등교' ? params_goUniversity : params_goHome;

  return params;
}

export const server_url = {
  goUniv: `http://${server_ip}/api/getSchedule/toTuk`,
  goHome: `http://${server_ip}/api/getSchedule/toStation`,
  entire_schedule: `http://${server_ip}/api/getSchedule/all`,
  login: `http://${server_ip}/api/logintest`,
};

export const all_schedule_url = (day: string): string => {
  const url = `http://${server_ip}/api/getSchedule/all?day=${day}`;
  return url;
};
