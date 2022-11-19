import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './CustomDrawerContent';
import Icons from 'react-native-vector-icons/Ionicons';
import TestPage01 from '../pages/testpages/TestPage01';
import LoginScreen from '../pages/LoginScreen';
import TestPage02 from '../pages/testpages/TestPage02';
import TabScreen from './TabScreen';
import { DrawerParamList } from '../../../types/navigation/types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="본캠퍼스"
        component={TabScreen} />
      <Drawer.Screen 
        name="제2캠퍼스"
        component={TestPage01} />

      <Drawer.Screen 
        name="설정"
        component={TestPage02} />  
    </Drawer.Navigator>
  )
} // Drawer(TabScreen + 테스트페이지 2)