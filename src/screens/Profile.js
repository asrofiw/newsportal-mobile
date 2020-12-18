import React, {Component} from 'react';
import {Image, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {View, Text, Container, Content, H1, Button, Toast} from 'native-base';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

// Import action
import profileAction from '../redux/actions/profile';
import authAction from '../redux/actions/auth';

// Import component
import ModalLoading from '../Components/ModalLoading';

export class Profile extends Component {
  state = {
    avatar: null,
    isModalOpen: false,
  };

  async componentDidMount() {
    try {
      const {token} = this.props.auth;
      await this.props.getProfile(token);
    } catch (e) {
      console.log(e.message);
    }
  }

  openGallery = () => {
    const option = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(option, (res) => {
      if (
        res.didCancel ||
        res.error ||
        res.customButton ||
        res.errorMessage ||
        res.errorCode
      ) {
        console.log(res);
      } else {
        console.log(res);
        this.setState({avatar: res});
      }
    });
  };

  openCamera = () => {
    const option = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
    };
    ImagePicker.launchCamera(option, (res) => {
      if (
        res.didCancel ||
        res.error ||
        res.customButton ||
        res.errorMessage ||
        res.errorCode
      ) {
        console.log(res);
      } else {
        console.log(res);
        this.setState({avatar: res});
      }
    });
  };

  saveAvatar = async () => {
    try {
      const {token} = this.props.auth;
      const {avatar} = this.state;
      const form = new FormData();
      const fileFilter = ['image/jpg', 'image/jpeg', 'image/png'];
      if (avatar) {
        if (avatar.fileSize > 2000000) {
          Toast.show({
            text: 'Limit file size 2mb',
            buttonText: 'Ok',
          });
        } else if (!fileFilter.includes(avatar.type)) {
          Toast.show({
            text: 'File must be an image',
            buttonText: 'Ok',
          });
        } else {
          form.append('avatar', {
            uri: avatar.uri,
            type: avatar.type,
            name: avatar.fileName,
          });
          await this.props.updateAvatar(token, form);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  logoutHandle = () => {
    this.props.logout();
    storage.removeItem('persist:root');
    Toast.show({
      text: 'Logout successfully',
      buttonText: 'Ok',
    });
  };

  closeModal = () => {
    this.setState({isModalOpen: false});
  };

  setAvatarNull = () => {
    this.setState({avatar: null});
  };

  async componentDidUpdate() {
    try {
      if (this.state.avatar && Object.values(this.state.avatar).length > 0) {
        this.saveAvatar();
        this.setAvatarNull();
      }

      const {
        isSuccessUpdate,
        isFailedUpdate,
        alertMsgUpdate,
      } = this.props.profile;
      if (isSuccessUpdate || isFailedUpdate) {
        this.closeModal();
        setTimeout(() => {
          Toast.show({
            text: alertMsgUpdate,
            buttonText: 'Ok',
          });
        }, 2000);
        const {token} = this.props.auth;
        this.props.getProfile(token);
        this.props.clearMsgUpdate();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  render() {
    const {avatar, name} = this.props.profile.dataUserDetail;
    const {isModalOpen} = this.state;
    return (
      <Container style={styles.parent}>
        {this.props.profile.isLoadingUpdate && <ModalLoading />}
        <Modal visible={isModalOpen} transparent>
          <View style={styles.modalView}>
            <View style={styles.wrapperBtnOptions}>
              <Text style={styles.txtTitleModal}>Select Options</Text>
              <TouchableOpacity
                style={styles.btnOptions}
                onPress={this.openCamera}>
                <Text style={styles.txtOptions}>Open camera...</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnOptions}
                onPress={this.openGallery}>
                <Text style={styles.txtOptions}>
                  Choose image from gallery...
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={this.closeModal}>
                <Text style={styles.txtCancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Content>
          <View>
            <H1 style={styles.title}>Profile</H1>
          </View>
          <View style={styles.headProfile}>
            <Button
              transparent
              style={styles.wrapperImg}
              onPress={() => this.setState({isModalOpen: true})}>
              <Image
                style={styles.img}
                source={
                  avatar
                    ? {uri: `${API_URL}${avatar}`}
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
  modalView: {
    backgroundColor: '#00000030',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleModal: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
    marginVertical: 10,
  },
  wrapperBtnOptions: {
    backgroundColor: '#ffffff',
    width: '80%',
    borderRadius: 10,
    paddingTop: 10,
  },
  btnOptions: {
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
  },
  txtOptions: {
    color: '#000000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textTransform: 'capitalize',
  },
  btnCancel: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 50,
  },
  txtCancel: {
    color: 'green',
  },
});
