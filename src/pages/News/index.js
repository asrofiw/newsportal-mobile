import React, {Component} from 'react';
import {Image} from 'react-native';
import {Content, Text, View} from 'native-base';
import {connect} from 'react-redux';
import styles from './style';
import moment from 'moment';

// import action
import newsAction from '../../redux/actions/news';

export class News extends Component {
  componentDidMount() {
    const {id} = this.props.route.params;
    const {token} = this.props.auth;
    this.props.getNewsDetail(token, id);
    console.log(this.props.news);
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
      <Content style={styles.parent}>
        <Text style={styles.title}>{headline}</Text>
        <Image
          source={
            image ? {uri: image} : require('../../assets/images/no_img.png')
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
