import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './style';

export class ChangePassword extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text> Change Password </Text>
      </View>
    );
  }
}

export default ChangePassword;
