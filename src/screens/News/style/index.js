import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'green',
    marginVertical: 20,
  },
  img: {
    height: 200,
  },
  titleImg: {
    fontSize: 12,
    color: 'grey',
    marginHorizontal: 10,
    textAlign: 'justify',
  },
  wrapperBody: {
    marginHorizontal: 10,
  },
  authorTxt: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    color: 'grey',
  },
  create: {
    fontSize: 14,
    color: 'grey',
  },
  category: {
    fontWeight: 'bold',
    textAlign: 'justify',
    fontSize: 16,
  },
  body: {
    fontWeight: 'normal',
    textAlign: 'justify',
    fontSize: 14,
  },
});
