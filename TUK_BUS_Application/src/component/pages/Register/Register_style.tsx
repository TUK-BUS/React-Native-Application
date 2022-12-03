import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: '10%',
    padding: '3%',
  },
  RowContainer: {
    flexDirection: 'row',
  },
  TopContainer: {
    flex: 2,
    marginBottom: '10%',
  },
  BottomContainer: {
    flex: 13,
  },
  CheckContainer: {
    flex: 5,
    borderWidth: 2,
    borderRadius: 8,
    margin: 6,
    padding: 4,
  },
  emptyContainer: {
    flex: 8,
  },
  InfoContainer: {
    flex: 11,
    borderWidth: 2,
    borderRadius: 8,
    margin: 6,
    padding: 4,
  },
  ButtonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputView: {
    marginBottom: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Button: {
    paddingLeft: '3%',
    paddingRight: '3%',
    marginRight: '2%',
    marginLeft: '2%',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  TextInput: {
    width: '45%',
    height: '75%',
    borderRadius: 5,
    fontSize: Dimensions.get('window').width / 24 - 2,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },

  fonts12: {
    fontSize: Dimensions.get('window').width / 24 + 12,
    fontWeight: 'bold',
    color: 'black',
    margin: 4,
  },
  fonts8: {
    fontSize: Dimensions.get('window').width / 24 + 8,
    fontWeight: 'bold',
    color: 'black',
    margin: 4,
  },
  fonts4: {
    fontSize: Dimensions.get('window').width / 24 + 4,
    fontWeight: 'bold',
    color: 'black',
    margin: 4,
  },
  fonts0: {
    fontSize: Dimensions.get('window').width / 24,
    fontWeight: 'bold',
    color: 'black',
    margin: 4,
  },
});
export default styles;
