import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View} from 'native-base';
import {connect} from 'react-redux';

// import action
import newsAction from '../redux/actions/news';

// import Components
import RenderCardListNews from '../Components/RenderCardListNews';
import ModalLoading from '../Components/ModalLoading';

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
    const {dataAllNews, isLoading} = this.props.news;

    return (
      <View style={styles.parent}>
        {isLoading && <ModalLoading />}
        {this.props.news && (
          <FlatList
            contentContainerStyle={styles.wrapperList}
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
  },
  wrapperList: {
    paddingHorizontal: 10,
  },
});
