import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
    TouchableWithoutFeedback, Text, View, TextInput,
    StyleSheet, Dimensions, TouchableOpacity, Keyboard, Alert,
} from 'react-native';

import { server_url } from '../../api/url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LoginProps} from '../../../types/navigation/types'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

// 함수들은 나중에 분리할게^^
const postData = async () => {
    try {
        const response = await axios.post(server_url.login, {
            userID: 'aaa',
            userPW: '111'
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}   // axios 통신인데 잘 모르겠음

const storeData = async (data: object) => {
    try {
        await AsyncStorage.setItem("userInfo", JSON.stringify(data))
        console.log("등록 완료")
    } catch (error) {
        console.log(error)
    }
}     // asyncstorage에 JSON데이터 저장

const loadData = async () => {
    try {
        const value = await AsyncStorage.getItem('userInfo');
        if (value !== null) {
            const userInfo = JSON.parse(value);
            console.log('id:' + userInfo.ID)
            console.log('pw:' + userInfo.PW)
        }
        console.log("배출 완료")
    } catch (error) {
        console.log(error)
    }
}   // asyncstorage에 저장된 데이터 확인(그냥 확인용임)

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const array = ["aaa", "111"];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        // 키보드 올라갈때 화면 안눌리게 해준대서 썼는데 모르겠음
        >
            <View style={styles.LoginContaier}>
                <View style={styles.LoginLogoContainer}>
                    <Text style={styles.LoginLogofonts}>TUK BUS</Text>

                    <TextInput
                        style={styles.LogintextInput}
                        placeholder="사용자 ID 입력"
                        autoFocus
                        onChangeText={(id) => setId(id)}
                        value={id}
                    ></TextInput>
                    <TextInput
                        style={styles.LogintextInput}
                        placeholder="password 입력"
                        onChangeText={(pw) => setPw(pw)}
                        value={pw}
                        autoFocus
                        secureTextEntry
                    ></TextInput>

                    <TouchableOpacity
                        style={styles.Loginpressable}
                        onPress={() => {
                            var data = {
                                "ID": id,
                                "PW": pw,
                            }   // JSON 데이터

                            if (id == array[0]
                                && pw == array[1]) {
                                // 나중에 조건을 서버에서 받은 데이터로 할 예정
                                storeData(data);
                                loadData();
                                navigation.goBack();
                            }   // 성공하면 초기화면으로 복귀
                            else {
                                console.log("error");
                                Alert.alert('실패', '로그인 정보가 잘못되었습니다.')
                                //postData()
                            }
                        }}
                    >
                        <Text style={styles.Loginfonts}>로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity   // 회원가입 버튼 미구현
                        style={styles.Logininvisible}>
                        <Text style={styles.Loginmini_fonts}>계정이 없다면?</Text>
    
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

// 나중에 합칠게^^
const styles = StyleSheet.create({
    LoginContaier: {
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
        fontSize: (Dimensions.get('window').width / 24) + 40,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: '12%',
    },
    Loginfonts: {
        fontSize: (Dimensions.get('window').width / 24) + 8,
        color: '#ffffff',
        fontWeight: 'bold',
        margin: 4,
    },
    Loginmini_fonts: {
        fontSize: (Dimensions.get('window').width / 24),
        fontWeight: 'bold',
        margin: 4,
    },
})

export default LoginScreen;