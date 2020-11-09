import React, {Component} from 'react';
import {Button, Text, View} from 'native-base';
import styles from './style';

export class Welcome extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.txtTitle}>NewsPortal</Text>
        <Button
          dark
          block
          rounded
          style={styles.btnSignup}
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.txtSignup}>Signup</Text>
        </Button>
        <Button
          bordered
          dark
          block
          rounded
          style={styles.btnLogin}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.txtLogin}>Login</Text>
        </Button>
      </View>
    );
  }
}

export default Welcome;
