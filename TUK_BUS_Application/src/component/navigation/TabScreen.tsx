import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactElement} from 'react';
import {TabParamList} from '../../../types/navigation/types';
import {TabBarIcon} from '../UI/atom/barIcon';
import {GoHome} from '../pages/Go_Home';
import {GoUniversity} from '../pages/Go_University';
import MaterialTabScreen from './MaterialTabScreen';
import AllSchedule from './AllScheduleTabScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabScreen(): ReactElement {
  return (
    <Tab.Navigator
      initialRouteName="등교"
      screenOptions={({route}) => ({
        headerShown:false,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
        tabBarLabelPosition: 'below-icon',
      })}>
      <Tab.Screen
        name="등교"
        component={GoUniversity}
        options={{title: '실시간 등교'}}
      />
      <Tab.Screen
        name="하교"
        component={GoHome}
        options={{title: '실시간 하교'}}
      />
      <Tab.Screen name="전체시간표" component={AllSchedule} />
      <Tab.Screen name="타는위치" component={MaterialTabScreen} />
    </Tab.Navigator>
  );
}
