import React, {Component} from 'react';
import {Button, Input, Item, Label, Text, Toast, View} from 'native-base';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

// Import action
import authAction from '../redux/actions/auth';

// import components
import ModalLoading from '../Components/ModalLoading';

const formSchema = yup.object({
  email: yup.string().email('must be a valid email').required('email required'),
  password: yup.string().min(8).required('password required'),
});

export class Login extends Component {
  componentDidUpdate() {
    const {isSuccess, isError, alertMsg} = this.props.auth;
    if (isSuccess || isError) {
      Toast.show({
        text: alertMsg,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.props.clearMsg();
    }
  }

  render() {
    const {isLoading} = this.props.auth;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.parent}>
          {isLoading && <ModalLoading />}
          <Text style={styles.title}>Login</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              Keyboard.dismiss();
              this.props.login(values).catch((e) => console.log(e.message));
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

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  item: {
    marginBottom: 2,
    borderBottomColor: 'black',
  },
  label: {
    color: 'black',
  },
  input: {
    color: 'black',
  },
  btn: {
    marginTop: 20,
  },
  toast: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  txtError: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    marginBottom: 10,
    textAlign: 'left',
  },
});
