import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChattingParamList} from '../../../types/navigation/types';
import ChattingRoomList from '../pages/Chatting/ChattingRoomListScreen';
import ChattingRoom from '../pages/Chatting/ChattingRoomScreen';
const Stack = createNativeStackNavigator<ChattingParamList>();

const ChattingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName={'채팅목록'}>
      <Stack.Screen
        name="채팅목록"
        component={ChattingRoomList}
        options={({navigation, route}) => ({
          headerRight: () => (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="chat-plus-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="채팅방" component={ChattingRoom} />
    </Stack.Navigator>
  );
};

export default ChattingNavigation;
