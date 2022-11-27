import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: '15%',
    padding: '3%',
  },
  TopContainer: {
    flex: 2,
    justifyContent: 'space-between',
  },
  TextInputView: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Button: {
    paddingLeft: '3%',
    paddingRight: '3%',
    marginLeft: '1%',
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
  },
  TextInput: {
    width: '30%',
    height: '75%',
    borderRadius: 5,
    marginRight: '1%',
    fontSize: Dimensions.get('window').width / 24 - 2,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  fonts4: {
    fontSize: Dimensions.get('window').width / 24 + 4,
    fontWeight: 'bold',
    margin: 4,
  },
  fonts0: {
    fontSize: Dimensions.get('window').width / 24,
    fontWeight: 'bold',
    margin: 4,
  },
  BottomContainer: {
    flex: 1,
    marginTop: '10%',
    alignItems: 'center',
  },
});
export default styles;
