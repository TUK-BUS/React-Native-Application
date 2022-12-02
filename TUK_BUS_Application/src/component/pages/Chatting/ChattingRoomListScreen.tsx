import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParam} from '../App';
import {server_ip} from '../../.env/auth';

export type ChattingRoomListProp = StackScreenProps<
  RootStackParam,
  'ChattingRoomList'
>;

type CreateRoom = {
  startingPoint: string;
  arrivalPoint: string;
  startingTime: string;
  roomID: string;
  userCount: number;
};

const ChattingRoomList = ({navigation, route}: ChattingRoomListProp) => {
  const [roomList, setRoomList] = useState([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [startingPoint, setStartingPoint] = useState<string>('');
  const [arrivalPoint, setArrivalPoint] = useState<string>('');
  const [startingTime, setStartingTime] = useState<string>('');

  useEffect(() => {
    getChattingRooms();
  }, []);

  const getChattingRooms = () => {
    AsyncStorage.getItem('token').then((response: any) => {
      const token = response;
      if (token) {
        axios
          .get(`http://${server_ip}/api/chatting/getchatlist`, {
            headers: {
              authorization: token,
            },
          })
          .then(Response => {
            console.log('getchatting', Response.data);
            setRoomList(Response.data.message);
          })
          .catch(Error => console.log('getchatting', Error));
      }
    });
  };

  const createRoom = async () => {
    AsyncStorage.getItem('token').then((response: any) => {
      const token = response;
      if (token) {
        axios
          .post(
            `http://${server_ip}/api/chatting/createchatroom`,
            {
              startingPoint: startingPoint,
              arrivalPoint: arrivalPoint,
              startingTime: startingTime,
              userID: route.params.name,
            },
            {
              headers: {
                authorization: token,
              },
            },
          )
          .then(Response => {
            setStartingTime('');
            setStartingPoint('');
            setArrivalPoint('');
            setModalVisible(!modalVisible);
            navigation.navigate('ChattingRoom', {
              name: route.params.name,
              roomID: Response.data.message.roomID,
              startingPoint: startingPoint,
              arrivalPoint: arrivalPoint,
            });
          })
          .catch(Error => {
            console.log('create error ', Error);
            setStartingTime('');
            setStartingPoint('');
            setArrivalPoint('');
          });
      }
    });
  };

  const enterRoom = (room: any) => {
    if (room.userCount < 3) {
      navigation.navigate('ChattingRoom', {
        roomID: room.roomID,
        startingPoint: room.startingPoint,
        arrivalPoint: room.arrivalPoint,
        name: route.params.name,
      });
    } else {
      Alert.alert('Alert', '인원초과', [
        {
          text: '확인',
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>채팅방</Text>
        </View>
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={getChattingRooms}>
            <Icon name="refresh" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => {
              setModalVisible(true);
            }}>
            <MaterialCommunityIcons
              name="chat-plus-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {roomList.map((room: CreateRoom) => (
          <TouchableOpacity key={room.roomID} onPress={() => enterRoom(room)}>
            <View>
              <View style={styles.roomContent}>
                <Text style={styles.roomText}>{room.startingPoint}</Text>
                <AntDesign name="arrowright" size={15} color="black" />
                <Text style={styles.roomText}>{room.arrivalPoint}</Text>
              </View>
              <View
                style={{
                  ...styles.roomContent,
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}>
                <Text style={styles.roomText}>
                  출발시간:{room.startingTime}
                </Text>
                {room.userCount >= 3 ? (
                  <Text style={{color: 'red'}}>{room.userCount}/3</Text>
                ) : (
                  <Text style={styles.roomText}>{room.userCount}/3</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                setModalVisible(!modalVisible);
                setStartingTime('');
                setStartingPoint('');
                setArrivalPoint('');
              }}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <TextInput
              placeholder="출발지"
              value={startingPoint}
              onChangeText={e => setStartingPoint(e)}></TextInput>
            <TextInput
              placeholder="목적지"
              value={arrivalPoint}
              onChangeText={e => setArrivalPoint(e)}></TextInput>
            <TextInput
              placeholder="출발시간"
              value={startingTime}
              onChangeText={e => setStartingTime(e)}></TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                createRoom();
              }}>
              <Text style={styles.textStyle}>생성</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  roomContent: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roomText: {color: 'black'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    paddingLeft: 0,
  },
  headerButton: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'grey',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ChattingRoomList;
