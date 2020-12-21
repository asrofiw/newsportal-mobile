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
  name: yup.string().required('name required'),
  email: yup.string().email('must be a valid email').required('email required'),
  password: yup.string().min(8).required('password required'),
});

export class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  onClearState = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
    });
  };

  componentDidUpdate() {
    const {
      isSuccessRegister,
      isFailedRegister,
      alertMsgRegister,
    } = this.props.auth;

    if (isSuccessRegister) {
      Toast.show({
        text: alertMsgRegister,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      setTimeout(() => {
        this.props.navigation.navigate('Login');
        this.props.clearMsgRegister();
        this.onClearState();
      });
    }

    if (isFailedRegister) {
      Toast.show({
        text: alertMsgRegister,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.props.clearMsgRegister();
    }
  }
  render() {
    const {isLoadingRegister} = this.props.auth;
    const {name, email, password} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.parent}>
          {isLoadingRegister && <ModalLoading />}
          <Text style={styles.title}>Register your account</Text>
          <Formik
            initialValues={{
              name: name,
              email: email,
              password: password,
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              Keyboard.dismiss();
              this.props.register(values).catch((e) => console.log(e.message));
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
                  <Label style={styles.label}>Name</Label>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                </Item>
                <Text style={styles.txtError}>
                  {touched.name && errors.name}
                </Text>
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
                  <Text>Register</Text>
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
  register: authAction.register,
  clearMsgRegister: authAction.clearMessageRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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
