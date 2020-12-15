import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 50,
    textTransform: 'uppercase',
  },
  item: {
    marginBottom: 2,
    borderBottomColor: 'black',
  },
  label: {
    color: 'black',
  },
  input: {
    color: 'black',
  },
  btn: {
    marginTop: 20,
  },
  toast: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  txtError: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    marginBottom: 10,
    textAlign: 'left',
  },
});
