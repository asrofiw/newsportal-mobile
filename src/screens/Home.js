import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View} from 'native-base';
import {connect} from 'react-redux';

// import action
import newsAction from '../redux/actions/news';

// import Components
import RenderCardListNews from '../Components/RenderCardListNews';

export class Home extends Component {
  state = {
    loading: false,
  };

  getData = async () => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    try {
      await this.props.getNews(token);
    } catch (e) {
      console.log(e.message);
    }
    this.setState({loading: false});
  };

  componentDidMount() {
    this.getData();
  }

  nextPage = async () => {
    try {
      const {token} = this.props.auth;
      if (this.props.news.pageInfo) {
        const {nextLink} = this.props.news.pageInfo;
        if (nextLink) {
          await this.props.getNewsNext(token, nextLink);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const {dataAllNews} = this.props.news;

    return (
      <View style={styles.parent}>
        {this.props.news && (
          <FlatList
            data={dataAllNews}
            renderItem={({item}) => <RenderCardListNews article={item} />}
            keyExtractor={(item) => item.id.toString()}
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
