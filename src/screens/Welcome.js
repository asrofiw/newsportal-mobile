import React, {Component} from 'react';
import {Button, Text, View} from 'native-base';
import {Image, StyleSheet} from 'react-native';

export class Welcome extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Image
          style={styles.img}
          source={require('../../assets/images/logo.png')}
        />
        <View>
          <Text style={styles.txtTitle}>
            " Think before you speak. Read before you think "
          </Text>
          <Text style={styles.subTitle}>- Fran Lebowitz</Text>
        </View>
        <View style={styles.wrapperBtn}>
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
      </View>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },
  txtTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subTitle: {
    fontStyle: 'italic',
  },
  wrapperBtn: {
    width: '100%',
  },
  btnSignup: {
    marginBottom: 20,
  },
  img: {
    borderRadius: 10,
    width: 200,
    height: 150,
    marginBottom: 80,
  },
});
