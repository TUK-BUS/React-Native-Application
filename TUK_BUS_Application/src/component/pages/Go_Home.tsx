/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {SubwayInfo, TimeInfo} from '../../../types/navigation/types';
import {CalcArrivalTime, CalcRemainTime, checkDest} from '../../util/calctime';
import {getArrivalTime} from '../../api/arrivalTimeAPI';
import {getHomeSchedule} from '../../api/serverAPI';
import {liveSchedule} from '../../../types/api/awsapiType';
import LiveSchedule from '../UI/molecule/live_schedule';
import Loading from './Loading';

const wait = (timeout: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, timeout);
  });
};

export function GoHome(): ReactElement {
  const [timeinfo, setTimeInfo] = useState<TimeInfo[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [home_bustime, setHome_Bustime] = useState<string[]>([]);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [subwayinfo, setSubwayInfo] = useState<SubwayInfo[]>([]);
  const [endofService, setEndofService] = useState<boolean>(false);
  const [alwaysOn, setAlwaysOn] = useState<boolean>(false);

  const onRefresh = () => {
    setTimeInfo([]);
    setHome_Bustime([]);
    setSubwayInfo([]);
    setLoading(true);
    setAlwaysOn(false);
    getLiveBusSchedule();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    setLoading(false);
  };

  const setupData = (duration: number[]) => {
    setTimeInfo([]);
    for (let i = 0; i < home_bustime.length; i++) {
      setTimeInfo(prev => [
        ...prev,
        {
          time: home_bustime[i],
          remain: CalcRemainTime(home_bustime[i]),
          arrival: CalcArrivalTime(home_bustime[i], duration[i]),
        },
      ]);
    }
    setLoading(false);
  };

  const getKakaoFutureRouteSearch = (schedule: liveSchedule) => {
    let duration: number[] = [];
    setHome_Bustime([]);
    if (schedule.Bus_schedule.length === 0) {
      setEndofService(true);
      setLoading(false);
      return;
    }
    schedule.Bus_schedule.map(async (item, index) => {
      switch (item.min) {
        case 0: {
          home_bustime.push(item.hour + ':' + item.min + '0');
          break;
        }
        case 5: {
          home_bustime.push(item.hour + ':' + '0' + item.min);
          break;
        }
        default: {
          home_bustime.push(item.hour + ':' + item.min);
        }
      }
      const {data} = await getArrivalTime(home_bustime[index], '하교');
      duration.push(data.routes[0].sections[0].duration);
    });
    // for (let i = 0; i < schedule.Bus_schedule.length; i++) {
    //   switch (schedule.Bus_schedule[i].min) {
    //     case 0: {
    //       home_bustime.push(
    //         schedule.Bus_schedule[i].hour +
    //           ':' +
    //           schedule.Bus_schedule[i].min +
    //           '0',
    //       );
    //       break;
    //     }
    //     case 5: {
    //       home_bustime.push(
    //         schedule.Bus_schedule[i].hour +
    //           ':' +
    //           '0' +
    //           schedule.Bus_schedule[i].min,
    //       );
    //       break;
    //     }
    //     default: {
    //       home_bustime.push(
    //         schedule.Bus_schedule[i].hour + ':' + schedule.Bus_schedule[i].min,
    //       );
    //     }
    //   }
    //   const {data} = await getArrivalTime(home_bustime[i], '하교');
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
    const checkTime = checkDest('하교');
    switch (checkTime) {
      case 0: {
        const {data} = await getHomeSchedule();
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
        const {data} = await getHomeSchedule();
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
      text="17:00~18:30 까지"
    />
  );
}
