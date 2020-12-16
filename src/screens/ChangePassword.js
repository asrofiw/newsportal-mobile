import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
