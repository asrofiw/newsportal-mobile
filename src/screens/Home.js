import React, {Component} from 'react';
import {FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {connect} from 'react-redux';
import moment from 'moment';

// import action
import newsAction from '../redux/actions/news';

export class Home extends Component {
  state = {
    loading: false,
  };

  getData = () => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    this.props.getNews(token);
    this.setState({loading: false});
  };

  componentDidMount() {
    this.getData();
  }

  nextPage = () => {
    const {nextLink} = this.props.news.pageInfo;
  };

  render() {
    const {dataAllNews} = this.props.news;
    const RenderItem = ({article}) => {
      return (
        <View style={styles.wrapper}>
          <Image
            source={
              article.image
                ? {uri: article.image}
                : require('../../assets/images/no_img.png')
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

    return (
      <View style={styles.parent}>
        {this.props.news && (
          <FlatList
            data={dataAllNews}
            renderItem={({item}) => <RenderItem article={item} />}
            onEndReachedThreshold={0.5}
            onEndReached={this.nextPage}
            refreshing={this.state.loading}
            onRefresh={this.getData}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
});

const mapDispatchToProps = {
  getNews: newsAction.getNews,
  getNewsNext: newsAction.getNewsNext,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
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
