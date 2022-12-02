import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParam} from '../App';
import {server_ip} from '../../.env/auth';

export type ChattingRoomProp = StackScreenProps<RootStackParam, 'ChattingRoom'>;

const ChattingRoom = ({navigation, route}: ChattingRoomProp) => {
  const [message, setMessage] = useState('');
  const [chatting, setChatting] = useState<object[]>([]);
  const scrollRef = useRef<any>();
  const socket = useRef<any>();

  useEffect(() => {
    AsyncStorage.getItem('token').then((response: any) => {
      socket.current = io(`http:///chat`, {
        auth: {
          token: response,
          //roomID 서버에서 준거
          roomID: route.params.roomID,
        },
      });
      socket.current.on('in', (e: string) => {
        console.log('in', e);
        chatting.push({type: 'in', userID: e});
        setChatting([...chatting]);
      });

      socket.current.on('chat message', (e: object) => {
        chatting.push(e);
        setChatting([...chatting]);
        console.log(e);
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const onSubmit = () => {
    if (message != '') {
      socket.current.emit('chat message', {
        userID: route.params.name,
        msg: message,
        sendTime: dayjs().format('HH:mm'),
      });
    }
    setMessage('');
  };

  const renderItem = ({item}: any) => {
    return item.type ? (
      <View>
        <Text style={style.info}>{item.userID}님이 입장하였습니다.</Text>
      </View>
    ) : item.userID === route.params.name ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
        }}>
        <Text>{item.time}</Text>
        <Text style={style.myChat}>{item.msg}</Text>
      </View>
    ) : (
      <View style={{marginLeft: 10, flexDirection: 'row'}}>
        <View>
          <Text style={{marginLeft: 5}}>{item.userID}</Text>
          <Text style={style.otherChat}>{item.msg}</Text>
        </View>

        <Text style={{alignSelf: 'flex-end'}}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => {
            socket.current.disconnect();
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={style.title}>{route.params.startingPoint}</Text>
          <AntDesign name="arrowright" size={15} color="black" />
          <Text style={style.title}>{route.params.arrivalPoint}</Text>
        </View>

        <View></View>
      </View>
      <FlatList
        renderItem={renderItem}
        keyExtractor={(item, index) => '' + index}
        data={chatting}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          placeholder="message"
          value={message}
          onChangeText={e => setMessage(e)}
          onSubmitEditing={onSubmit}
          style={style.message}></TextInput>
        <TouchableOpacity style={style.sendButton} onPress={onSubmit}>
          <Icon name="send" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  message: {
    borderColor: 'grey',
    borderWidth: 1,
    width: '85%',
  },
  sendButton: {
    width: '25%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  myChat: {
    padding: 10,
    color: 'white',
    backgroundColor: 'grey',
    fontSize: 16,
    borderRadius: 20,
    marginVertical: 10,
    margin: 10,
  },
  otherChat: {
    padding: 10,
    color: 'white',
    backgroundColor: 'grey',
    fontSize: 16,
    borderRadius: 20,
    marginVertical: 5,
  },
  info: {
    padding: 5,
    color: 'white',
    backgroundColor: 'grey',
    fontsize: 12,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

export default ChattingRoom;
