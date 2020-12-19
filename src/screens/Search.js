import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input, Item} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

// Import action
import newsAction from '../redux/actions/news';

// Import component
import ModalLoading from '../Components/ModalLoading';
import RenderCardListNews from '../Components/RenderCardListNews';

export class Search extends Component {
  state = {
    search: '',
    title: '',
    sort: 'newest',
    loading: false,
    isModalOpen: false,
  };

  onChangeValueSearch = (value) => {
    this.setState({search: value});
  };

  submitSearch = async () => {
    try {
      const {token} = this.props.auth;
      const {sort} = this.state;
      let order = '';
      if (sort.length > 0) {
        if (sort === 'newest') {
          order = 'desc';
        } else if (sort === 'oldest') {
          order = 'asc';
        }
      }
      await this.props.searchNews(token, this.state.search, order);
    } catch (e) {
      console.log(e.message);
    }
  };

  openModal = () => {
    this.setState({isModalOpen: true});
  };

  setTitle = () => {
    this.setState({title: this.state.search});
  };

  componentDidUpdate() {
    const {isSuccessSearch} = this.props.news;
    if (isSuccessSearch) {
      this.props.clearMsg();
      this.setTitle();
    }
  }

  pullToRefresh = async () => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    try {
      await this.props.searchNews(token, this.state.search, this.state.sort);
    } catch (e) {
      console.log(e.message);
    }
    this.setState({loading: false});
  };

  nextPage = async () => {
    try {
      const {token} = this.props.auth;
      if (this.props.news.pageInfoSearch) {
        const {nextLink} = this.props.news.pageInfoSearch;
        if (nextLink) {
          await this.props.searchNext(token, nextLink);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <View style={styles.parent}>
        {this.props.news.isLoadingSearch && <ModalLoading />}
        <View style={styles.wrapperInput}>
          <Item regular style={styles.itemInput}>
            <Icon
              name="magnify"
              size={25}
              color="#9EA0A5"
              style={styles.iconSearch}
            />
            <Input
              placeholder="Search"
              placeholderTextColor="#9EA0A5"
              value={this.state.search}
              onChangeText={this.onChangeValueSearch}
              style={styles.inputSearch}
              onSubmitEditing={this.submitSearch}
            />
          </Item>
          <Button style={styles.btn} onPress={this.openModal}>
            <Icon name="format-list-bulleted" size={25} color="#9EA0A5" />
          </Button>
        </View>
        {this.props.news.dataSearch.length > 0 && (
          <View style={styles.wrapperList}>
            {this.state.title.length > 0 && (
              <Text>
                Search "{this.state.title}" order by "{this.state.sort}"
              </Text>
            )}
            <FlatList
              data={this.props.news.dataSearch}
              renderItem={({item}) => <RenderCardListNews article={item} />}
              keyExtractor={(item) => item.id.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={this.nextPage}
              refreshing={this.state.loading}
              onRefresh={this.pullToRefresh}
            />
          </View>
        )}
        {this.props.news.isErrorSearch && (
          <View style={styles.wrapperNotFound}>
            <Text>Data not found</Text>
          </View>
        )}
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={this.state.isModalOpen}
          onBackdropPress={() => this.setState({isModalOpen: false})}
          backdropOpacity={0.3}>
          <View style={styles.modalView}>
            <Button
              transparent
              full
              style={styles.btnOption}
              onPress={() => {
                this.setState({isModalOpen: false, sort: 'newest'});
              }}>
              <Text style={styles.txtOption}>Sort by newest</Text>
            </Button>
            <Button
              transparent
              full
              style={styles.btnOption}
              onPress={() => {
                this.setState({isModalOpen: false, sort: 'oldest'});
              }}>
              <Text style={styles.txtOption}>Sort by oldest</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
});

const mapDispatchToProps = {
  searchNews: newsAction.searchNews,
  searchNext: newsAction.searchNext,
  clearMsg: newsAction.clearMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapperInput: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemInput: {
    flexGrow: 1,
    height: 50,
    backgroundColor: '#ffffff',
    marginRight: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: '#ffffff40',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  inputSearch: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    color: '#1F2A36',
  },
  btn: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    shadowColor: '#ffffff40',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  wrapperList: {
    paddingHorizontal: 15,
  },
  wrapperNotFound: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginHorizontal: 40,
  },
  btnOption: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F4',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  txtOption: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: '#1F2A36',
  },
});
