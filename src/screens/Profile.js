import React, {Component} from 'react';
import {Image, StyleSheet, PermissionsAndroid} from 'react-native';
import {View, Text, Container, Content, H1, Button, Toast} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-async-storage/async-storage';

// Import action
import profileAction from '../redux/actions/profile';
import authAction from '../redux/actions/auth';

export class Profile extends Component {
  state = {
    avatar: null,
  };

  componentDidMount() {
    const {token} = this.props.auth;
    this.props.getProfile(token);
  }

  saveAvatar = () => {
    const {token} = this.props.auth;
    const {avatar} = this.state;
    const form = new FormData();
    form.append('avatar', {
      uri: avatar.uri,
      type: avatar.type,
      name: avatar.fileName,
    });
    this.props.updateAvatar(token, form);
  };

  handleChoosePhoto = () => {
    const option = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(option, (res) => {
      if (res.uri) {
        this.setState({avatar: res});
        this.saveAvatar();
      }
    });
  };

  logoutHandle = () => {
    this.props.logout();
    storage.removeItem('persist:root');
    Toast.show({
      text: 'Logout successfully',
      buttonText: 'Ok',
    });
  };

  componentDidUpdate() {
    const {
      isSuccessUpdate,
      isFailedUpdate,
      alertMsgUpdate,
    } = this.props.profile;
    if (isSuccessUpdate || isFailedUpdate) {
      Toast.show({
        text: alertMsgUpdate,
        buttonText: 'Ok',
      });
      const {token} = this.props.auth;
      this.props.getProfile(token);
      this.props.clearMsgUpdate();
    }
  }

  render() {
    const {avatar, name} = this.props.profile.dataUserDetail;
    return (
      <Container style={styles.parent}>
        <Content>
          <View>
            <H1 style={styles.title}>Profile</H1>
          </View>
          <View style={styles.headProfile}>
            <Button
              transparent
              style={styles.wrapperImg}
              onPress={this.handleChoosePhoto}>
              <Image
                style={styles.img}
                source={
                  avatar
                    ? {uri: avatar}
                    : require('../../assets/images/default-avatar1.png')
                }
              />
              <View style={styles.icon}>
                <Icon name="pencil" size={15} color="grey" />
              </View>
            </Button>
            <Button
              full
              transparent
              style={styles.btnEdit}
              onPress={() => this.props.navigation.navigate('EditProfile')}>
              <View>
                <Text style={styles.txtName}>{name}</Text>
                <Text style={styles.txtEdit}>Edit profile</Text>
              </View>
            </Button>
          </View>
          <Button
            full
            transparent
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <View>
              <Text style={styles.txtTitle}>Settings</Text>
              <Text style={styles.txtChild}>password</Text>
            </View>
            <View>
              <Icon name="chevron-right" color="#9B9B9B" size={25} />
            </View>
          </Button>
          <Button
            full
            transparent
            style={styles.btn}
            onPress={this.logoutHandle}>
            <View>
              <Text style={styles.txtTitleLogout}>Logout</Text>
            </View>
            <View>
              <Icon name="chevron-right" color="#9B9B9B" size={25} />
            </View>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile: profileAction.getProfileDetail,
  updateAvatar: profileAction.updateAvatar,
  clearMsgUpdate: profileAction.clearAlertMsgUpdate,
  logout: authAction.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  title: {
    fontSize: 34,
    lineHeight: 34,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  wrapperImg: {
    height: 64,
    width: 64,
    borderRadius: 50,
    marginRight: 20,
  },
  img: {
    height: 64,
    width: 64,
    borderRadius: 50,
    backgroundColor: 'blue',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEdit: {
    height: 64,
  },
  headProfile: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },
  txtName: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  txtEdit: {
    fontSize: 14,
    color: 'green',
  },
  btn: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#9B9B9B',
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    height: 72,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
    marginBottom: 10,
  },
  txtTitleLogout: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  txtChild: {
    fontSize: 12,
    lineHeight: 12,
    color: '#9B9B9B',
  },
});
