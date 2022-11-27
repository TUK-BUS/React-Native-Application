/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './CustomDrawerContent_style';

export default function CustomDrawerContent(props: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    props.navigation.addListener('focus', () => {
      checkLoginStatus();
    });
  };

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      // if (value !== null) {
      //   //AsyncStorage의 데이터 유무로 로그인 상태 파악
      //   setIsLogin(true);
      //   console.log(value);
      // } else {
      //   setIsLogin(false);
      // }
      if (value) {
        setIsLogin(true);
      } else {
        //AsyncStorage의 데이터 유무로 로그인 상태 파악
        setIsLogin(false);
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.TopContainer}>
        <View style={styles.Profile}></View>
        {isLogin ? ( // 로그인 상태일경우 닉네임, 아닐경우 로그인 이동 버튼
          <Text style={styles.fonts4}>UserNickname</Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('로그인');
            }}>
            <Text style={styles.fonts4}>로그인이 필요합니다</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.MiddleContainer}>
        <DrawerItem
          label="제 1캠퍼스"
          labelStyle={styles.fonts0}
          onPress={() => {
            props.navigation.navigate('본캠퍼스');
          }}
        />
        <DrawerItem
          label="제 2캠퍼스"
          labelStyle={styles.fonts0}
          onPress={() => {
            props.navigation.navigate('제2캠퍼스');
          }}
        />
        <DrawerItem
          label="설정"
          labelStyle={styles.fonts0}
          onPress={() => {
            props.navigation.navigate('설정');
          }}
        />
      </View>
      <View style={styles.BottomContainer}>
        {isLogin ? (
          <TouchableOpacity
            onPress={() => {
              // 로그인 상태가 아닐경우 로그아웃 버튼 X
              AsyncStorage.clear();
              props.navigation.navigate('로그인');
            }}>
            <Text style={styles.fonts0}>로그아웃</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </DrawerContentScrollView>
  );
}