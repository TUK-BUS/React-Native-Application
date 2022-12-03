import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {styles} from '../../style/stylesheet.css';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="black" />
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
