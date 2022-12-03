import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard, Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { LoginProps } from '../../../../types/navigation/types';
import { loginUser } from '../../../api/serverAPI';
import styles from './Login_style';

const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [isButton, setIsButton] = useState<boolean>(false);

  useEffect(() => {
    if (id.length > 5 && pw.length > 5) {
      setIsButton(true);
    } else setIsButton(false);
  }, [id, pw]);   // id, password 글자 수로 버튼 활성화

  const getLoginData = async () => {
    try {
      const response: any = await loginUser({
        userID: id,
        userPW: pw,
      });
      console.log('~~~~~ success? ~~~~', response.success);
      return response;
    } catch (error) {
      console.error('~~~~ LoginScreen ~~~~ error', error);
    }
  }; // axios 통신

  const storeData = async (data: object) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
      console.log('등록 완료');
    } catch (error) {
      console.log('storeData error', error);
    }
  }; // asyncstorage에 JSON데이터 저장

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        console.log('id:' + userInfo.userID);
        console.log('pw:' + userInfo.userPW);
        console.log('name:' + userInfo.token.userNAME);
        console.log('token:' + userInfo.token);
      }
    } catch (error) {
      console.log('~~~~ LoginScreen ~ AsyncStorage ~ error', error);
    }
  }; // asyncstorage에 저장된 데이터 확인(확인용)

  const onPressLoginButton = async () => {
    const loginResponse: any = await getLoginData();
    if (isButton && loginResponse.success) {
      const data = {
        userID: id,
        userPW: pw,
        token: loginResponse.token, // token = username + access + refresh token
      };
      storeData(data);
      loadData();
      navigation.goBack();
    } else {
      console.log('onPressLoginButton ~~~ error');
      Alert.alert('실패', '로그인 정보가 잘못되었습니다.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        <View style={styles.TopContainer}>
          <Text style={styles.fonts40}>TUK BUS</Text>
        </View>
        <View style={styles.MiddleContainer}>
          <TextInput
            style={styles.TextInput}
            placeholder="사용자 ID 입력"
            autoFocus
            onChangeText={setId}
            value={id}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="password 입력"
            onChangeText={setPw}
            value={pw}
            autoFocus
            secureTextEntry
          />
        </View>
        <View style={styles.BottomContainer}>
          <TouchableOpacity
            style={[
              styles.Button,
              {backgroundColor: isButton ? 'black' : 'grey'},
            ]}
            onPress={onPressLoginButton}>
            <Text style={styles.fonts8}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.InvisibleView}
            onPress={() => {
              navigation.navigate('계정생성');
            }}>
            <Text style={styles.fonts0}>계정이 없다면?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
