import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';

const RenderCArdListNews = ({article}) => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={
          article.image
            ? {uri: article.image}
            : require('../../../assets/images/no_img.png')
        }
        style={styles.img}
      />
      <View style={styles.wrapperRight}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('News', {id: article.id})
          }>
          <Text style={styles.headline}>{article.headline}</Text>
        </TouchableOpacity>
        <Text style={styles.category}>
          {article.category} |{' '}
          <Text style={styles.date}>
            {moment.utc(article.date).local().startOf('seconds').fromNow()}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default RenderCArdListNews;

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
  wrapperRight: {
    height: 130,
    width: 250,
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
});
