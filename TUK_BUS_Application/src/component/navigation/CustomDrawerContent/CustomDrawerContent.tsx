/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './CustomDrawerContent_style';
import Icons from 'react-native-vector-icons/Ionicons';

export default function CustomDrawerContent(props: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

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
      if (value) {
        const userInfo = JSON.parse(value);
        setIsLogin(true);
        setUsername(userInfo.token.userNAME);
        // 로그인 성공 시 async storage에 저장된 토큰의 username 불러옴
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.TopContainer}>
        <View style={styles.Profile}></View>
        {isLogin ? ( // 로그인 상태일경우 닉네임, 아닐경우 로그인 이동 버튼
          <Text style={[styles.fonts4, {marginLeft: '7%'}]}>{username}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('로그인');
            }}>
            <Text style={[styles.fonts4, {color: 'red'}]}>
              로그인이 필요합니다
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.MiddleContainer}>
        <DrawerItem
          label="제 1캠퍼스"
          icon={() => <Icons name={'school'} size={30} color={'black'}></Icons>}
          labelStyle={styles.fonts0}
          onPress={() => {
            props.navigation.navigate('제1캠퍼스');
          }}
        />
        <DrawerItem
          label="제 2캠퍼스"
          icon={() => (
            <Icons name={'school-outline'} size={30} color={'black'}></Icons>
          )}
          labelStyle={styles.fonts0}
          onPress={() => {
            props.navigation.navigate('제2캠퍼스');
          }}
        />
        {isLogin ? ( // 로그인 상태면 채팅 기능 활성화
          <DrawerItem
            label="채팅"
            icon={() => (
              <Icons
                name={'chatbox-ellipses'}
                size={30}
                color={'black'}></Icons>
            )}
            labelStyle={styles.fonts0}
            onPress={() => {
              props.navigation.navigate('채팅');
            }}
          />
        ) : (
          <View />
        )}
        <DrawerItem
          label="설정"
          icon={() => (
            <Icons name={'settings'} size={30} color={'black'}></Icons>
          )}
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
