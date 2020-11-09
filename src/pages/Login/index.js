import React, {Component} from 'react';
import {Button, Input, Item, Label, Text, Toast, View} from 'native-base';
import styles from './style';
import {connect} from 'react-redux';

// Import action
import authAction from '../../redux/actions/auth';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    isToast: false,
  };

  login = () => {
    Toast.show({
      style: styles.toast,
      text: 'Login success',
      buttonText: 'OK',
    });
  };

  showToast = () => {};

  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.title}>Login</Text>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Email</Label>
          <Input style={styles.input} />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Password</Label>
          <Input style={styles.input} secureTextEntry />
        </Item>
        <Button dark rounded block style={styles.btn} onPress={this.login}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({auth: state.auth});
const mapDispatchToProps = {
  login: authAction.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
