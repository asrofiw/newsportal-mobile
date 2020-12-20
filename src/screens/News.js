import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Content, Text, View} from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';
import {API_URL} from '@env';

// import action
import newsAction from '../redux/actions/news';

export class News extends Component {
  async componentDidMount() {
    try {
      const {id} = this.props.route.params;
      const {token} = this.props.auth;
      await this.props.getNewsDetail(token, id);
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    const {
      image,
      headline,
      category,
      city,
      createdAt,
      body,
    } = this.props.news.dataNewsDetail;
    return (
      <Content>
        <View style={styles.parent}>
          <Text style={styles.title}>{headline}</Text>
          <Image
            source={
              image
                ? {uri: `${API_URL}${image}`}
                : require('../../assets/images/no_img.png')
            }
            style={styles.img}
          />
          <Text style={styles.titleImg}>{headline}</Text>
          <View style={styles.wrapperBody}>
            <View style={styles.authorTxt}>
              <Text style={styles.city}>{city}, </Text>
              <Text style={styles.create}>
                {moment.utc(createdAt).local().startOf('seconds').fromNow()}
              </Text>
            </View>
            <View>
              <Text style={styles.category}>
                {category}
                <Text style={styles.body}> - {body}</Text>
              </Text>
            </View>
          </View>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
});

const mapDispatchToProps = {
  getNewsDetail: newsAction.getNewsDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'green',
    marginBottom: 20,
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
