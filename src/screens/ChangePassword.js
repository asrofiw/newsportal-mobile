import React, {Component} from 'react';
import {Button, Input, Item, Label, Text, Toast, View} from 'native-base';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

// Import action
import profileAction from '../redux/actions/profile';

// Import Component
import ModalLoading from '../Components/ModalLoading';

const formSchema = yup.object({
  oldPassword: yup.string().required('Password required'),
  newPassword: yup
    .string()
    .min(8, 'New password length must be 8 or more')
    .required(),
  confirmPassword: yup
    .string()
    .min(8, 'Password length must be 8 or more')
    .oneOf([yup.ref('newPassword'), null], "Passwords doesn't match"),
});

export class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  onSetFormNull = () => {
    this.setState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  componentDidUpdate() {
    const {
      isSuccessUpdate,
      isFailedUpdate,
      alertMsgUpdate,
    } = this.props.profile;

    if (isSuccessUpdate) {
      Toast.show({
        text: alertMsgUpdate,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 2000,
      });
      this.props.clearMsg();
      this.onSetFormNull();
    }

    if (isFailedUpdate) {
      Toast.show({
        text: alertMsgUpdate,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 2000,
      });
      this.props.clearMsg();
    }
  }
  render() {
    const {isLoadingUpdate} = this.props.profile;
    const {oldPassword, newPassword, confirmPassword} = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.parent}>
          {isLoadingUpdate && <ModalLoading />}
          <Formik
            initialValues={{
              oldPassword: oldPassword,
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            }}
            validationSchema={formSchema}
            onSubmit={async (values) => {
              try {
                Keyboard.dismiss();
                const {token} = this.props.auth;
                await this.props.changePassword(token, values);
              } catch (e) {
                console.log(e.message);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.wrapperForm}>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Password</Label>
                  <Input
                    secureTextEntry
                    style={styles.input}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    value={values.oldPassword}
                  />
                </Item>
                <Text style={styles.txtError}>
                  {touched.oldPassword && errors.oldPassword}
                </Text>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>New password</Label>
                  <Input
                    secureTextEntry
                    style={styles.input}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                  />
                </Item>
                <Text style={styles.txtError}>
                  {touched.newPassword && errors.newPassword}
                </Text>
                <Item floatingLabel style={styles.item}>
                  <Label style={styles.label}>Confirm password</Label>
                  <Input
                    style={styles.input}
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                </Item>
                <Text style={styles.txtError}>
                  {touched.confirmPassword && errors.confirmPassword}
                </Text>
                <Button
                  dark
                  rounded
                  block
                  style={styles.btn}
                  onPress={handleSubmit}>
                  <Text>Submit</Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = {
  changePassword: profileAction.changePassword,
  clearMsg: profileAction.clearAlertMsgUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  wrapperForm: {
    marginVertical: 20,
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
