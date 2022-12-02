import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {LoginProps} from '../../../../types/navigation/types';
import {
  registerAuthMail,
  registerAuthMailCheck,
  registerUser,
  checkId,
} from '../../../api/serverAPI';
import styles from './Register_style';

const RegisterScreen: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [checkNum, setCheckNum] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwconfirm, setPwconfirm] = useState<string>('');
  const [IsSecurePw, setIsSecurePw] = useState<boolean>(true);
  const [IsSecurePwconfirm, setIsSecurePwconfirm] = useState<boolean>(true);
  const [pwiconname, setPwiconname] = useState<string>('eye');
  const [pwconfirmiconname, setPwconfirmiconname] = useState<string>('eye');
  const [username, setUsername] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false); // 메일 인증 여부
  const [isButton, setIsButton] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false); // 계정 생성 조건이 맞으면 true
  const [isIdcheck, setIsIdcheck] = useState<boolean>(false); // id 중복 여부

  useEffect(() => {
    if (
      id.length > 5 &&
      pw.length > 5 &&
      username.length > 1 &&
      phoneNumber.length > 10 &&
      isIdcheck // 글자 수, 중복 체크 확인 후 버튼 활성화
    ) {
      setIsButton(true);
    } else setIsButton(false);
  }, [id, pw, username, phoneNumber, isIdcheck]);

  useEffect(() => {
    if (id.length > 5) {
      // id 길이 조건에 맞았을 때부터 중복확인
      getidCheck();
    } else {
      setIsIdcheck(false);
    }
  }, [id]);

  const getRegisterAuthMail = async () => {
    try {
      const response = await registerAuthMail({
        userEmail: email + '@tukorea.ac.kr',
      });
      console.log('Register.tsx ~ line 31 ~ response ', response);
      if (!response.success) {
        Alert.alert('실패');
      }
    } catch (e) {
      console.log('Register.tsx ~ line 33 ~ error ', e);
    }
  };

  const getAuthNumCheck = async () => {
    try {
      const response = await registerAuthMailCheck({
        userEmail: email + '@tukorea.ac.kr',
        mail_authNum: checkNum,
      });
      if (!response.success) {
        Alert.alert('실패', '인증번호가 틀렸습니다\n다시 입력해주세요.');
      } else {
        setIsConfirm(true);
        console.log('isCheck: ' + isCheck);
        Alert.alert('성공', '이메일 인증이 완료되었습니다.');
      }
    } catch (e) {
      console.log('getAuthNumCheck ~ line 52 ~ error', e);
    }
  };

  const getRegisterUser = async () => {
    try {
      const response: any = await registerUser({
        userID: id,
        userPW: pw,
        userNAME: username,
        userPHON_NUM: phoneNumber,
        userEmail: email + '@tukorea.ac.kr',
      });
      return response;
    } catch (error) {
      console.error('~~~~ RegisterUser ~~~~ error', error);
    }
  }; // axios 통신

  const getidCheck = async () => {
    try {
      const response: any = await checkId({
        userID: id,
      });
      setIsIdcheck(response);
      return response;
    } catch (error) {
      console.error('~~~~ IdCheck ~~~~ error', error);
    }
  };

  const checkRegister = async () => {
    if (isButton) {
      if (pw !== pwconfirm) {
        setIsCheck(false);
        const alertMessage = '재입력한 비밀번호가 일치하지 않습니다.';
        Alert.alert('실패', alertMessage);
        console.log('failed_1');
      } else {
        await getRegisterUser(); // 성공 후 api 전송
        setIsCheck(true);
        console.log('successed');
        navigation.goBack();
      }
    }
  };

  return (
    <View style={styles.Container}>
      {isConfirm ? ( // 인증여부에 따른 내용 변화
        <View style={styles.TopContainer}>
          <View style={styles.RowContainer}>
            <Icons name={'checkmark'} size={40} color={'black'}></Icons>
            <Text style={styles.fonts8}>이메일 인증이 완료되었습니다.</Text>
          </View>
          <Text style={[styles.fonts0, {marginLeft: '12%'}]}>
            생성할 계정 정보를 입력해주세요.
          </Text>
        </View>
      ) : (
        <View style={styles.TopContainer}>
          <Text style={styles.fonts8}>이메일 인증이 필요합니다.</Text>
          <Text style={styles.fonts0}>채팅 기능은 계정이 필요합니다.</Text>
        </View>
      )}
      {isConfirm ? (
        <View style={styles.BottomContainer}>
          <View style={styles.InfoContainer}>
            <View style={styles.TextInputView}>
              <Icons name={'at-circle'} size={36} color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {width: '30%'}]}
                placeholder="TUK mail"
                onChangeText={setEmail}
                value={email}
                editable={!isConfirm}
              />
              <Text style={styles.fonts0}>@ tukorea.ac.kr</Text>
            </View>
            <View style={styles.TextInputView}>
              <Icons name={'person'} size={36} color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {marginRight: 5}]}
                placeholder="ID (6자 이상)"
                onChangeText={setId}
                value={id}
              />
              {isIdcheck ? (
                <Text style={[styles.fonts0, {color: 'blue'}]}>
                  사용할 수 있습니다.
                </Text>
              ) : (
                <Text style={[styles.fonts0, {color: 'red'}]}>
                  사용할 수 없습니다.
                </Text>
              )}
            </View>
            <View style={styles.TextInputView}>
              <Icons name={'lock-closed'} size={36} color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {marginRight: '3%'}]}
                placeholder="비밀번호 (6자 이상)"
                onChangeText={setPw}
                value={pw}
                secureTextEntry={IsSecurePw}
              />
              <TouchableOpacity
                onPress={() => {
                  if (IsSecurePw) {
                    setIsSecurePw(false);
                    setPwiconname('eye-off');
                  } else {
                    setIsSecurePw(true);
                    setPwiconname('eye');
                  }
                }}>
                <Icons name={pwiconname} size={36} color={'black'}></Icons>
              </TouchableOpacity>
            </View>
            <View style={styles.TextInputView}>
              <Icons name={'lock-open'} size={36} color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {marginRight: '3%'}]}
                placeholder="비밀번호 확인"
                onChangeText={setPwconfirm}
                value={pwconfirm}
                secureTextEntry={IsSecurePwconfirm}
              />
              <TouchableOpacity
                onPress={() => {
                  if (IsSecurePwconfirm) {
                    setIsSecurePwconfirm(false);
                    setPwconfirmiconname('eye-off');
                  } else {
                    setIsSecurePwconfirm(true);
                    setPwconfirmiconname('eye');
                  }
                }}>
                <Icons
                  name={pwconfirmiconname}
                  size={36}
                  color={'black'}></Icons>
              </TouchableOpacity>
            </View>
            <View style={styles.TextInputView}>
              <Icons name={'person-circle'} size={36} color={'black'}></Icons>
              <TextInput
                style={styles.TextInput}
                placeholder="이름"
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View style={styles.TextInputView}>
              <Icons name={'call'} size={36} color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {width: '50%'}]}
                placeholder="전화번호 (-빼고 입력)"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={[
                styles.Button,
                {
                  backgroundColor: isButton ? 'black' : 'grey',
                  flex: 1,
                  padding: '2%',
                },
              ]}
              onPress={checkRegister}>
              <Text style={[styles.fonts4, {color: 'white'}]}>계정 생성</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.BottomContainer}>
          <View style={styles.CheckContainer}>
            <Text style={styles.fonts0}>이메일 인증</Text>
            <View style={styles.TextInputView}>
              <Icons name={'at-circle'} size={36} color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {width: '30%'}]}
                placeholder="TUK mail"
                onChangeText={setEmail}
                value={email}
                editable={!isConfirm}
              />
              <Text style={styles.fonts0}>@ tukorea.ac.kr</Text>
              <TouchableOpacity
                style={styles.Button}
                onPress={getRegisterAuthMail}>
                <Text style={[styles.fonts0, {color: 'white'}]}>전송</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.TextInputView}>
              <Icons
                name={'checkmark-circle'}
                size={36}
                color={'black'}></Icons>
              <TextInput
                style={[styles.TextInput, {width: '20%'}]}
                onChangeText={setCheckNum}
                placeholder="인증번호"
                value={checkNum}
                maxLength={4}
                keyboardType="number-pad"
              />
              <TouchableOpacity style={styles.Button} onPress={getAuthNumCheck}>
                <Text style={[styles.fonts0, {color: 'white'}]}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.emptyContainer}></View>
        </View>
      )}
    </View>
  );
};

export default RegisterScreen;
