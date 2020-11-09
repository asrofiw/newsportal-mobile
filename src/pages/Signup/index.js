import React, {Component} from 'react';
import {Button, Input, Item, Label, Text, Toast, View} from 'native-base';
import styles from './style';

export class Signup extends Component {
  signup = () => {
    Toast.show({
      style: styles.toast,
      text: 'Signup success',
      buttonText: 'OK',
    });
  };
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.title}>Sign up</Text>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Name</Label>
          <Input style={styles.input} />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Email</Label>
          <Input style={styles.input} />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label style={styles.label}>Password</Label>
          <Input style={styles.input} secureTextEntry />
        </Item>
        <Button dark rounded block style={styles.btn} onPress={this.signup}>
          <Text>Create Account</Text>
        </Button>
      </View>
    );
  }
}

export default Signup;
