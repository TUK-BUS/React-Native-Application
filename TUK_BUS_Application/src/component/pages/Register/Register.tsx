import React, {useEffect, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {LoginProps} from '../../../../types/navigation/types';
import styles from './Register_style';

const Register: React.FC<LoginProps> = ({navigation}) => {
  const [id, setId] = useState<string>('');
  const [cn, setCn] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pwcf, setPwcf] = useState<string>('');
  const [Securepw, setSecurepw] = useState<boolean>(true);
  const [Securepwcf, setSecurepwcf] = useState<boolean>(true);
  const [pwiconname, setPwiconname] = useState<string>('eye');
  const [pwcficonname, setPwcficonname] = useState<string>('eye');
  const [username, setUsername] = useState<string>('');
  const [Isconfirm, setIsconfirm] = useState<boolean>(false);
  const [IsButton, setIsButton] = useState<boolean>(false);

  useEffect(() => {
    if (id.length > 5 && pw.length > 5 && username.length > 1) {
      setIsButton(true);
    } else setIsButton(false);
  }, [id, pw, username]);

  const checkConfirm = () => {
    var testnum = 1234;
    if (!Isconfirm) {
      if (parseInt(cn) == testnum) {
        setIsconfirm(true);
        Alert.alert('성공', '인증이 완료되었습니다.');
        navigation.goBack();
      } else Alert.alert('실패', '인증번호가 일치하지 않습니다.');
    } else Alert.alert('알림', '이미 인증되었습니다.');
  };

  const checkRegister = () => {
    var Ischeck = false;
    if (IsButton) {
      if (!Isconfirm) {
        Ischeck = false;
        Alert.alert('실패', '인증번호 확인이 완료되지 않았습니다.');
        console.log('failed_1');
      } else if (pw !== pwcf) {
        Ischeck = false;
        Alert.alert('실패', '재입력한 비밀번호가 일치하지 않습니다.');
        console.log('failed_2');
      } else {
        Ischeck = true;
        console.log('successed');
      }
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.TopContainer}>
        <View style={styles.TextInputView}>
          <Text style={styles.fonts0}>Email: </Text>
          <TextInput
            style={styles.TextInput}
            autoFocus
            onChangeText={setId}
            value={id}
            editable={!Isconfirm}
          />
          <Text style={styles.fonts0}>@ tukorea.ac.kr</Text>
          <TouchableOpacity style={styles.Button} onPress={() => {}}>
            <Text style={[styles.fonts0, {color: 'white'}]}>전송</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TextInputView}>
          <Text style={styles.fonts0}>인증번호: </Text>
          <TextInput
            style={styles.TextInput}
            autoFocus
            onChangeText={setCn}
            value={cn}
            maxLength={4}
            keyboardType="number-pad"
          />
          <TouchableOpacity style={styles.Button} onPress={checkConfirm}>
            <Text style={[styles.fonts0, {color: 'white'}]}>확인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TextInputView}>
          <Text style={styles.fonts0}>비밀번호: </Text>
          <TextInput
            style={styles.TextInput}
            autoFocus
            onChangeText={setPw}
            value={pw}
            secureTextEntry={Securepw}
          />
          <TouchableOpacity
            onPress={() => {
              if (Securepw) {
                setSecurepw(false);
                setPwiconname('eye-off');
              } else {
                setSecurepw(true);
                setPwiconname('eye');
              }
            }}>
            <Icon name={pwiconname} size={32} color={'black'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.TextInputView}>
          <Text style={styles.fonts0}>비밀번호 확인: </Text>
          <TextInput
            style={styles.TextInput}
            autoFocus
            onChangeText={setPwcf}
            value={pwcf}
            secureTextEntry={Securepwcf}
          />
          <TouchableOpacity
            onPress={() => {
              if (Securepwcf) {
                setSecurepwcf(false);
                setPwcficonname('eye-off');
              } else {
                setSecurepwcf(true);
                setPwcficonname('eye');
              }
            }}>
            <Icon name={pwcficonname} size={32} color={'black'}></Icon>
          </TouchableOpacity>
        </View>
        <View style={styles.TextInputView}>
          <Text style={styles.fonts0}>이름: </Text>
          <TextInput
            style={styles.TextInput}
            autoFocus
            onChangeText={setUsername}
            value={username}
          />
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          style={[
            styles.Button,
            {backgroundColor: IsButton ? 'black' : 'grey'},
          ]}
          onPress={checkRegister}>
          <Text style={[styles.fonts4, {color: 'white'}]}>계정 생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
