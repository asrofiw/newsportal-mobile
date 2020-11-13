import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtError: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    marginBottom: 10,
    textAlign: 'left',
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 5,
  },
  inputBody: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 5,
    height: 100,
  },
  txtBtnImg: {
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  img: {
    height: 200,
    marginVertical: 10,
  },
});
