import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from './style';

export class Home extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text> Home Page </Text>
      </View>
    );
  }
}

export default Home;
