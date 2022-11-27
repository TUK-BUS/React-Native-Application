import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  TopContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  MiddleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  BottomContainer: {
    flex: 4,

    alignItems: 'center',
  },

  TextInput: {
    padding: '3%',
    marginBottom: '2%',
    width: '70%',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  Button: {
    width: '70%',
    padding: '2%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    fontWeight: 'bold',
  },
  InvisibleView: {
    margin: '10%',
    width: '50%',
    height: '20%',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontWeight: 'bold',
  },

  fonts40: {
    fontSize: Dimensions.get('window').width / 24 + 40,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: '12%',
  },
  fonts8: {
    fontSize: Dimensions.get('window').width / 24 + 8,
    color: '#ffffff',
    fontWeight: 'bold',
    margin: 4,
  },
  fonts0: {
    fontSize: Dimensions.get('window').width / 24,
    fontWeight: 'bold',
    margin: 4,
  },
});
export default styles;