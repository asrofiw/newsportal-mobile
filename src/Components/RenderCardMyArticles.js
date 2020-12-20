import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RenderCardMyArticles = ({article, onPressDelete}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('News', {id: article.id})}>
      <View style={styles.wrapper}>
        <Image
          source={
            article.image
              ? {uri: `${API_URL}${article.image}`}
              : require('../../assets/images/no_img.png')
          }
          style={styles.img}
        />
        <View style={styles.wrapperContent}>
          <Text style={styles.headline}>{article.headline}</Text>
          <Text style={styles.category}>
            {article.category} |{' '}
            <Text style={styles.date}>
              {moment.utc(article.date).local().startOf('seconds').fromNow()}
            </Text>
          </Text>
        </View>
        <View style={styles.wrapperRight}>
          <TouchableOpacity onPress={onPressDelete}>
            <Icon name="trash-can-outline" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderCardMyArticles;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 20,
    height: 130,
  },
  img: {
    height: 130,
    width: 110,
    borderRadius: 10,
    marginRight: 10,
  },
  wrapperContent: {
    flexGrow: 1,
    width: '50%',
    paddingVertical: 3,
  },
  headline: {
    fontSize: 16,
    textAlign: 'justify',
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: 'grey',
  },
  date: {
    fontSize: 14,
    color: 'grey',
  },
  wrapperRight: {
    width: 30,
    alignItems: 'flex-end',
    paddingVertical: 3,
  },
});
