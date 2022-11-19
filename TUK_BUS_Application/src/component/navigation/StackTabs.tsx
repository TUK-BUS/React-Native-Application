import React, {ReactElement} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../pages/LoginScreen';
import DrawerNavigation from './Drawer';

import {StackParamList} from '../../../types/navigation/types';
// import TestPage02 from '../pages/testpages/TestPage02';

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackTabs(): ReactElement {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
      <Stack.Screen
        options={{headerShown: true}}
        name="로그인"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
} // Drawer(기존 본캠퍼스 screen + 테스트용 2개) + 로그인 화면
