import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Toast} from 'native-base';

// import action
import newsAction from '../redux/actions/news';

// import Component
import RenderCardMyArticles from '../Components/RenderCardMyArticles';
import ModalLoading from '../Components/ModalLoading';

export class MyArticles extends Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const {token} = this.props.auth;
      await this.props.getArticlesUser(token);
    } catch (e) {
      console.log(e.message);
    }
  };

  onDelete = async (id) => {
    try {
      const {token} = this.props.auth;
      await this.props.deleteNews(token, id);
    } catch (e) {
      console.log(e.message);
    }
  };

  componentDidUpdate() {
    const {isSuccessDelete, isErrorDelete, alertMsgDelete} = this.props.news;
    if (isSuccessDelete) {
      Toast.show({
        text: alertMsgDelete,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.getData();
      this.props.clearMsg();
    }
    if (isErrorDelete) {
      Toast.show({
        text: alertMsgDelete,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.props.clearMsg();
    }
  }

  nextPage = async () => {
    try {
      const {token} = this.props.auth;
      if (this.props.news.pageInfoUser) {
        const {nextLink} = this.props.news.pageInfoUser;
        if (nextLink) {
          await this.props.getArticleUserNext(token, nextLink);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const {articlesUser, isLoading} = this.props.news;
    return (
      <View style={styles.parent}>
        {isLoading && <ModalLoading />}
        {articlesUser && articlesUser.length > 0 ? (
          <FlatList
            data={articlesUser}
            contentContainerStyle={styles.wrapperList}
            renderItem={({item}) => (
              <RenderCardMyArticles
                article={item}
                onPressDelete={() => this.onDelete(item.id)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={this.nextPage}
            refreshing={this.state.loading}
            onRefresh={this.getData}
          />
        ) : (
          <View style={styles.wrapperText}>
            <Text>You haven't post any articles yet</Text>
          </View>
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
  getArticlesUser: newsAction.getNewsUser,
  getArticleUserNext: newsAction.getNewsNextUser,
  deleteNews: newsAction.deleteNews,
  clearMsg: newsAction.clearMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArticles);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapperList: {
    paddingHorizontal: 10,
  },
  wrapperText: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
