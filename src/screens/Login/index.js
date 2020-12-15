import React, {Component} from 'react';
import {Button, Input, Item, Label, Text, Toast, View} from 'native-base';
import styles from './style';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

// Import action
import authAction from '../../redux/actions/auth';

const formSchema = yup.object({
  email: yup.string().email('must be a valid email').required('email required'),
  password: yup.string().min(3).required('password required'),
});

export class Login extends Component {
  componentDidUpdate() {
    const {isSuccess, isError, alertMsg} = this.props.auth;
    if (isSuccess || isError) {
      Toast.show({
        text: alertMsg,
        buttonText: 'Ok',
        style: styles.toast,
      });
      this.props.clearMsg();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.parent}>
          <Text style={styles.title}>Login</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              Keyboard.dismiss();
              this.props.login(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Email</Label>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </Item>
                <Text style={styles.txtError}>
                  {touched.email && errors.email}
                </Text>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Password</Label>
                  <Input
                    style={styles.input}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </Item>
                <Text style={styles.txtError}>
                  {touched.password && errors.password}
                </Text>
                <Button
                  dark
                  rounded
                  block
                  style={styles.btn}
                  onPress={handleSubmit}>
                  <Text>Login</Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => ({auth: state.auth});
const mapDispatchToProps = {
  login: authAction.login,
  clearMsg: authAction.clearMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
