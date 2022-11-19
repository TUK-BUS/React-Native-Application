/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width * 0.3;

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
      <View style={styles.drawertopcontainer}>
        <View style={styles.drawerprofile}></View>
        {isLogin ? ( // 로그인 상태일경우 닉네임, 아닐경우 로그인 이동 버튼
          <Text style={styles.drawernamefonts}>UserNickname</Text>
        ) : (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('로그인');
            }}>
            <Text style={styles.drawernamefonts}>로그인이 필요합니다</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.drawermiddlecontainer}>
        <DrawerItem
          label="제 1캠퍼스"
          labelStyle={styles.drawermenufonts}
          onPress={() => {
            props.navigation.navigate('본캠퍼스');
          }}
        />
        <DrawerItem
          label="제 2캠퍼스"
          labelStyle={styles.drawermenufonts}
          onPress={() => {
            props.navigation.navigate('제2캠퍼스');
          }}
        />
        <DrawerItem
          label="설정"
          labelStyle={styles.drawermenufonts}
          onPress={() => {
            props.navigation.navigate('설정');
          }}
        />
      </View>
      <View style={styles.drawerbottomcontainer}>
        {isLogin ? (
          <TouchableOpacity
            onPress={() => {
              // 로그인 상태가 아닐경우 로그아웃 버튼 X
              AsyncStorage.clear();
              props.navigation.navigate('로그인');
            }}>
            <Text style={styles.drawermenufonts}>로그아웃</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    </DrawerContentScrollView>
  );
}

// stylesheet는 마지막에 합치기로^^
const styles = StyleSheet.create({
  drawertopcontainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
  drawerprofile: {
    width: width,
    height: width,
    margin: 6,
    marginBottom: 15,
    borderRadius: 90,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerimage: {
    width: width - 2,
    height: width - 2,
    borderRadius: 90,
  },
  drawermiddlecontainer: {
    padding: 8,
    paddingBottom: '70%',
    borderBottomWidth: 1,
  },
  drawerbottomcontainer: {
    padding: 12,
  },

  drawernamefonts: {
    fontSize: Dimensions.get('window').width / 24 + 4,
    fontWeight: 'bold',
  },
  drawermenufonts: {
    fontSize: Dimensions.get('window').width / 24,
    fontWeight: 'bold',
  },
});
