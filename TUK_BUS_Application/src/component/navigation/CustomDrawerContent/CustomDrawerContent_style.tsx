import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: 'grey',
      justifyContent:'space-around'
    },
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
      flexDirection:'row',
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
      height: 400,
    },
    RowContainer: {
      flexDirection: 'row',
    },
    BottomContainer: {
      borderTopWidth: 1,
      padding: 12,
    },
  
    fonts4: {
      fontSize: Dimensions.get('window').width / 24 + 4,
      color: 'black',
      fontWeight: 'bold',
    },
    fonts0: {
      fontSize: Dimensions.get('window').width / 24,
      color: 'black',
      fontWeight: 'bold',
    },
  });
  export default styles