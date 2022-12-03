import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerParamList} from '../../../types/navigation/types';
import TestPage01 from '../pages/testpages/TestPage01';
import TestPage02 from '../pages/testpages/TestPage02';
import TabScreen from './TabScreen';
import CustomDrawerContent from './CustomDrawerContent/CustomDrawerContent';
import ChattingNavigation from './ChatingStack';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <Drawer.Screen name="제1캠퍼스" component={TabScreen} />
      <Drawer.Screen name="제2캠퍼스" component={TestPage01} />
      <Drawer.Screen name="채팅" component={ChattingNavigation} />
      <Drawer.Screen name="설정" component={TestPage02} />
    </Drawer.Navigator>
  );
} // Drawer(TabScreen + 테스트페이지 2)
