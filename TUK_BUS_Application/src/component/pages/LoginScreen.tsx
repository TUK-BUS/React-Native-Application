import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginProps} from '../../../types/navigation/types';
import {loginUser} from '../../api/serverAPI';

const LoginScreen: React.FC<LoginProps> = ({navigation}) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [isButton, setIsButton] = useState<boolean>(false);

  useEffect(() => {
    if (id.length > 5 && pw.length > 5) {
      setIsButton(true);
    }
  }, [id, pw]);

  // 함수들은 나중에 분리할게^^
  const getLoginData = async () => {
    try {
      const response: any = await loginUser({
        userID: id,
        userPW: pw,
      });
      // console.log('~~~~ LoginScreen ~~~ response', response);
      console.log('~~~~~', response.success);
      return response;
    } catch (error) {
      console.error('~~~~ LoginScreen ~~~~ error', error);
    }
  }; // axios 통신인데 잘 모르겠음

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
        console.log('token:' + userInfo.token);
      }
      console.log('배출 완료');
    } catch (error) {
      console.log('~~~~ LoginScreen ~ AsyncStorage ~ error', error);
    }
  }; // asyncstorage에 저장된 데이터 확인(그냥 확인용임)

  const onPressLoginButton = async () => {
    const loginResponse: any = await getLoginData();
    if (loginResponse.success) {
      const data = {
        userID: id,
        userPW: pw,
        token: loginResponse.token,
      };
      storeData(data);
      loadData();
      navigation.goBack();
    } else {
      console.log('onPressLoginButton ~~~ error');
      Alert.alert('실패', '로그인 정보가 잘못되었습니다.');
      //postData()
    }
  };

  useEffect(() => {}, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      // 키보드 올라갈때 화면 안눌리게 해준대서 썼는데 모르겠음
    >
      <View style={styles.LoginContainer}>
        <View style={styles.LoginLogoContainer}>
          <Text style={styles.LoginLogofonts}>TUK BUS</Text>
          <TextInput
            style={styles.LogintextInput}
            placeholder="사용자 ID 입력"
            autoFocus
            onChangeText={setId}
            value={id}
          />
          <TextInput
            style={styles.LogintextInput}
            placeholder="password 입력"
            onChangeText={setPw}
            value={pw}
            autoFocus
            secureTextEntry
          />
          {isButton && (
            <>
              <TouchableOpacity
                style={styles.Loginpressable}
                onPress={onPressLoginButton}>
                <Text style={styles.Loginfonts}>로그인</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity // 회원가입 버튼 미구현
            style={styles.Logininvisible}>
            <Text style={styles.Loginmini_fonts}>계정이 없다면?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// 나중에 합칠게^^
const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  LoginLogoContainer: {
    marginTop: '15%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  LogintextInput: {
    marginBottom: '2%',
    width: '70%',
    height: '12%',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  Loginpressable: {
    marginBottom: '10%',
    width: '70%',
    height: '14%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    fontWeight: 'bold',
  },
  Logininvisible: {
    margin: 6,
    width: '50%',
    height: '10%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontWeight: 'bold',
  },

  LoginLogofonts: {
    fontSize: Dimensions.get('window').width / 24 + 40,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: '12%',
  },
  Loginfonts: {
    fontSize: Dimensions.get('window').width / 24 + 8,
    color: '#ffffff',
    fontWeight: 'bold',
    margin: 4,
  },
  Loginmini_fonts: {
    fontSize: Dimensions.get('window').width / 24,
    fontWeight: 'bold',
    margin: 4,
  },
});

export default LoginScreen;
