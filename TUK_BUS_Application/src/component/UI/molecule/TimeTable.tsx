/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {schedule} from '../../../../types/api/awsapiType';
import {
  Props,
  all_schedule,
  timedata,
} from '../../../../types/navigation/types';
import {getEntireSchedule} from '../../../api/serverAPI';
import {styles} from '../../../style/stylesheet.css';

export default function TimeTable({route}: Props): ReactElement {
  const [totalschedule] = useState<all_schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {day} = route.params;

  const univschedule: timedata[] = [];
  const homeschedule: timedata[] = [];

  const sortData = (data: schedule[]) => {
    for (let i = 0; i < data.length; i++) {
      switch (data[i].seq.includes('S')) {
        case true: {
          if (data[i].min === 0) {
            homeschedule.push({
              hour: data[i].hour.toString(),
              min: data[i].min.toString() + '0',
            });
            break;
          }
          if (data[i].min === 5) {
            homeschedule.push({
              hour: data[i].hour.toString(),
              min: '0' + data[i].min.toString(),
            });
            break;
          }
          homeschedule.push({
            hour: data[i].hour.toString(),
            min: data[i].min.toString(),
          });
          break;
        }
        case false: {
          if (data[i].min === 0) {
            univschedule.push({
              hour: data[i].hour.toString(),
              min: data[i].min.toString() + '0',
            });
            break;
          }
          if (data[i].min === 5) {
            univschedule.push({
              hour: data[i].hour.toString(),
              min: '0' + data[i].min.toString(),
            });
            break;
          }
          univschedule.push({
            hour: data[i].hour.toString(),
            min: data[i].min.toString(),
          });
          break;
        }
      }
    }
    setData(univschedule, homeschedule, data);
  };

  const setData = (univ: timedata[], home: timedata[], data: schedule[]) => {
    for (let i = 0; i < data.length; i++) {
      if (home[i] === undefined && univ[i] === undefined) {
        break;
      }
      if (home[i] === undefined) {
        totalschedule.push({
          station: '',
          university: univ[i].hour + ':' + univ[i].min,
        });
      } else if (univ[i] === undefined) {
        totalschedule.push({
          station: home[i].hour + ':' + home[i].min,
          university: '',
        });
      } else {
        totalschedule.push({
          station: home[i].hour + ':' + home[i].min,
          university: univ[i].hour + ':' + univ[i].min,
        });
      }
    }
    setLoading(true);
  };

  const getAllSchedule = async () => {
    const {data} = await getEntireSchedule(day);

    return new Promise((resolve, reject) => {
      if (resolve) {
        resolve(sortData(data.Bus_schedule));
      } else {
        reject(console.error('error'));
      }
    });
  };

  useEffect(() => {
    getAllSchedule();
  }, []);

  if (loading === false) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (  // 배경색, 폰트 사이즈, 굵기 조정
      <View style={styles.timetable_container}>
        <DataTable>
          <DataTable.Header style={{borderBottomWidth: 1, borderBottomColor: 'black'}}>
            <DataTable.Title textStyle={styles.fonts_2}>등교</DataTable.Title>
            <DataTable.Title textStyle={styles.fonts_2}>하교</DataTable.Title>
          </DataTable.Header>
          {day === 'weekday' && (
            <DataTable.Row>
              <DataTable.Cell textStyle={styles.fonts_2}>08:40~10:20  상시운행</DataTable.Cell>
              <DataTable.Cell textStyle={styles.fonts_2}>17:00~18:30  상시운행</DataTable.Cell>
            </DataTable.Row>
          )}
          <FlatList
            data={totalschedule}
            renderItem={({item}) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell textStyle={[styles.fonts_2, {fontWeight: 'normal'}]}>{item.university}</DataTable.Cell>
                  <DataTable.Cell>{item.station}</DataTable.Cell>
                </DataTable.Row>
              );
            }}
          />
        </DataTable>
      </View>
    );
  }
}
