import React, {Component} from 'react';
import {Button, Input, Item, Label, Text, Toast, View} from 'native-base';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

// Import action
import authAction from '../../redux/actions/auth';

const formSchema = yup.object({
  name: yup.string().required('name required'),
  email: yup.string().email('must be a valid email').required('email required'),
  password: yup.string().min(3).required('password required'),
});

export class Signup extends Component {
  componentDidUpdate() {
    const {
      isSuccessRegister,
      isFailedRegister,
      alertMsgRegister,
    } = this.props.auth;
    if (isSuccessRegister || isFailedRegister) {
      Toast.show({
        text: alertMsgRegister,
        buttonText: 'Ok',
        style: styles.toast,
      });
      this.props.clearMsgRegister();
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.parent}>
          <Text style={styles.title}>Sign up</Text>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              Keyboard.dismiss();
              this.props.register(values);
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
                  <Text>Create Account</Text>
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
