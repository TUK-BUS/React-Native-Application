import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  TabScreen: undefined;
};

export type TabParamList = {
  등교: undefined;
  하교: undefined;
  전체시간표: undefined;
  타는위치: undefined;
};

export type MaterialTabParamList = {
  등교: undefined;
  '등교(17:30~)': undefined;
  하교: undefined;
};

export type AllScheduleTabParamList = {
  평일: {day: string};
  토요일: {day: string};
  일요일: {day: string};
};

export type Props = MaterialTopTabScreenProps<AllScheduleTabParamList>;

export type TimeInfo = {
  time: string;
  remain: number;
  arrival: string;
};

export type flatlistParams = {
  item: TimeInfo;
};

export type subwayParams = {
  data: SubwayInfo[];
};

export type SubwayInfo = {
  bstatnNm: string;
  arvlMsg2: string;
  arvlMsg3: string;
};

export type all_schedule = {
  station: string;
  university: string;
};

export type timedata = {
  hour: string;
  min: string;
};

export type RootStackParamList2 = {
  StackTabs: undefined;
}; // 나중에 RootStackParamList로 변경 예정

// 추가된 type 변수들
export type StackParamList = {
  로그인: undefined;
  설정: undefined;
  Drawer: undefined;
}; //StackTabs

export type LoginProps = {
  navigation: NativeStackNavigationProp<StackParamList>;
}; //LoginScreen

export type DrawerParamList = {
  본캠퍼스: undefined;
  제2캠퍼스: undefined;
  설정: undefined;
};

export type DrawerProps = {
  props: DrawerNavigationProp<DrawerParamList>;
};
