/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {SubwayInfo, TimeInfo} from '../../../types/navigation/types';
import {CalcArrivalTime, CalcRemainTime, checkDest} from '../../util/calctime';
import {getArrivalTime} from '../../api/arrivalTimeAPI';
import {getUnivSchedule} from '../../api/serverAPI';
import {liveSchedule} from '../../../types/api/awsapiType';
import LiveSchedule from '../UI/molecule/live_schedule';
import Loading from './Loading';
import ExclusiveComponent from '../UI/common/component/exclusive_component';

const wait = (timeout: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
};

export function GoUniversity(): ReactElement {
  const [timeinfo, setTimeInfo] = useState<TimeInfo[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [univ_bustime, setUniv_Bustime] = useState<string[]>([]);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [subwayinfo, setSubwayInfo] = useState<SubwayInfo[]>([]);
  const [endofService, setEndofService] = useState<boolean>(false);
  const [alwaysOn, setAlwaysOn] = useState<boolean>(false);
  const [rideArrival, setRideArrival] = useState<boolean>(false);

  const onRefresh = () => {
    setTimeInfo([]);
    setUniv_Bustime([]);
    setSubwayInfo([]);
    setAlwaysOn(false);
    setRideArrival(false);
    setLoading(true);
    getLiveBusSchedule();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    setLoading(false);
  };

  const setupData = (duration: number[]) => {
    setTimeInfo([]);
    for (let i = 0; i < univ_bustime.length; i++) {
      setTimeInfo(prev => [
        ...prev,
        {
          time: univ_bustime[i],
          remain: CalcRemainTime(univ_bustime[i]),
          arrival: CalcArrivalTime(univ_bustime[i], duration[i]),
        },
      ]);
    }
    setLoading(false);
  };

  const getKakaoFutureRouteSearch = async (schedule: liveSchedule) => {
    let duration: number[] = [];
    setUniv_Bustime([]);
    if (schedule.Bus_schedule.length === 0) {
      setEndofService(true);
      setLoading(false);
      return;
    }
    schedule.Bus_schedule.map(async (item, index) => {
      switch (item.min) {
        case 0: {
          univ_bustime.push(item.hour + ':' + item.min + '0');
          break;
        }
        case 5: {
          univ_bustime.push(item.hour + ':' + '0' + item.min);
          break;
        }
        default: {
          univ_bustime.push(item.hour + ':' + item.min);
        }
      }
      const {data} = await getArrivalTime(univ_bustime[index], '하교');
      duration.push(data.routes[0].sections[0].duration);
    });
    // for (let i = 0; i < schedule.Bus_schedule.length; i++) {
    //   switch (schedule.Bus_schedule[i].min) {
    //     case 0: {
    //       univ_bustime.push(
    //         schedule.Bus_schedule[i].hour +
    //           ':' +
    //           schedule.Bus_schedule[i].min +
    //           '0',
    //       );
    //       break;
    //     }
    //     case 5: {
    //       univ_bustime.push(
    //         schedule.Bus_schedule[i].hour +
    //           ':' +
    //           '0' +
    //           schedule.Bus_schedule[i].min,
    //       );
    //       break;
    //     }
    //     default: {
    //       univ_bustime.push(
    //         schedule.Bus_schedule[i].hour + ':' + schedule.Bus_schedule[i].min,
    //       );
    //     }
    //   }
    //   const {data} = await getArrivalTime(univ_bustime[i], '등교');
    //   duration.push(data.routes[0].sections[0].duration);
    // }

    return new Promise((resolve, reject) => {
      if (resolve) {
        resolve(setupData(duration));
      } else {
        reject(console.error('error'));
      }
    });
  };

  const setupSubwayInfo = (data: liveSchedule) => {
    for (let i = 0; i < data.Subway_schedule.length; i++) {
      setSubwayInfo(prev => [
        ...prev,
        {
          bstatnNm: data.Subway_schedule[i].bstatnNm,
          arvlMsg2: data.Subway_schedule[i].arvlMsg2,
          arvlMsg3: data.Subway_schedule[i].arvlMsg3,
        },
      ]);
    }
  };

  const getLiveBusSchedule = async () => {
    const checkTime = checkDest('등교');
    switch (checkTime) {
      case 0: {
        const {data} = await getUnivSchedule();
        return new Promise((resolve, reject) => {
          if (resolve) {
            resolve(getKakaoFutureRouteSearch(data));
            resolve(setupSubwayInfo(data));
          } else {
            reject(console.error('error'));
          }
        });
      }
      case 1: {
        const {data} = await getUnivSchedule();
        return new Promise((resolve, reject) => {
          if (resolve) {
            resolve(setupSubwayInfo(data));
            resolve(setAlwaysOn(true));
            resolve(setLoading(false));
          } else {
            reject(console.error('error'));
          }
        });
      }
      case 2: {
        setRideArrival(true);
        setLoading(false);
        return;
      }
      default: {
        console.error('switch error');
        return;
      }
    }
  };

  useEffect(() => {
    getLiveBusSchedule();
  }, []);

  return loading ? (
    <Loading />
  ) : rideArrival ? (
    <ExclusiveComponent
      item1={'17시 이후부턴 하교 도착 지점에서 곧바로 탑니다.'}
      item2={'하교시간표를 참고하세요.'}
    />
  ) : (
    <LiveSchedule
      timeinfo={timeinfo}
      refreshing={refreshing}
      onRefresh={onRefresh}
      setVisible={setVisible}
      isVisible={isVisible}
      subwayinfo={subwayinfo}
      endofService={endofService}
      alwaysOn={alwaysOn}
      text="08:40~10:20 까지"
    />
  );
}
