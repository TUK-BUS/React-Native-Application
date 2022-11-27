import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({

    TopContainer: {
      padding: 10,
      borderBottomWidth: 1,
    },
    Profile: {
      width: Dimensions.get('window').width * 0.3,
      height: Dimensions.get('window').width * 0.3,
      margin: 6,
      marginBottom: 15,
      borderRadius: 90,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Image: {
      width: Dimensions.get('window').width * 0.3 - 2,
      height: Dimensions.get('window').width * 0.3 - 2,
      borderRadius: 90,
    },
    MiddleContainer: {
      padding: 8,
      paddingBottom: '70%',
      borderBottomWidth: 1,
    },
    BottomContainer: {
      padding: 12,
    },
  
    fonts4: {
      fontSize: Dimensions.get('window').width / 24 + 4,
      fontWeight: 'bold',
    },
    fonts0: {
      fontSize: Dimensions.get('window').width / 24,
      fontWeight: 'bold',
    },
  });
  export default styles