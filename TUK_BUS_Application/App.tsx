import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList2} from './types/navigation/types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabScreen from './src/component/navigation/TabScreen';
import {StatusBar} from 'react-native';
import StackTabs from './src/component/navigation/StackTabs';
const Stack = createNativeStackNavigator<RootStackParamList2>();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            //바꿨음
            name="StackTabs"
            component={StackTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
