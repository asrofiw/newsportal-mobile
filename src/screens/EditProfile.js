import React, {Component} from 'react';
import {TouchableWithoutFeedback, Keyboard, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Input,
  Button,
  Item,
  Label,
  Content,
  Toast,
} from 'native-base';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import * as yup from 'yup';

// import Action
import profileAction from '../redux/actions/profile';

// IMport component
import ModalLoading from '../Components/ModalLoading';

const formSchema = yup.object({
  name: yup.string().required('name required'),
  email: yup.string().email('must be a valid email'),
  birthdate: yup.string().nullable(),
  gender: yup.string().nullable(),
});

export class EditProfile extends Component {
  async componentDidMount() {
    try {
      const {token} = this.props.auth;
      await this.props.getProfile(token);
      console.log(this.props.profile);
    } catch (e) {
      console.log(e.message);
    }
  }

  componentDidUpdate() {
    const {
      isSuccessUpdate,
      isFailedUpdate,
      alertMsgUpdate,
    } = this.props.profile;
    if (isSuccessUpdate || isFailedUpdate) {
      Toast.show({
        text: alertMsgUpdate,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.props.clearMsgUpdate();
    }
  }

  render() {
    const {token} = this.props.auth;
    const {name, email, birthdate, gender} = this.props.profile.dataUserDetail;
    return (
      <Content style={styles.parent}>
        {this.props.profile.isLoadingUpdate && <ModalLoading />}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Formik
              initialValues={{
                name: name,
                email: email,
                birthdate: birthdate,
                gender: gender,
              }}
              validationSchema={formSchema}
              onSubmit={async (values) => {
                try {
                  const data = {};
                  if (values.name !== name) {
                    data.name = values.name;
                  } else if (values.email !== email) {
                    data.email = values.email;
                  } else if (values.birthdate !== birthdate) {
                    data.birthdate = values.birthdate;
                  } else if (values.gender !== gender) {
                    data.gender = values.gender;
                  }

                  if (Object.values(data).length > 0) {
                    await this.props.updateProfile(token, data);
                  } else {
                    Toast.show({
                      text: 'There is no data changed',
                      buttonText: 'Ok',
                    });
                  }
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
                <View>
                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>Name</Label>
                    <Input
                      placeholder="enter your name"
                      placeholderTextColor="#9b9b9b"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.name && errors.name}
                  </Text>

                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>Email</Label>
                    <Input
                      placeholder="enter your email"
                      placeholderTextColor="#9b9b9b"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.name && errors.email}
                  </Text>

                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>Birthdate</Label>
                    <Input
                      placeholder="yyyy/mm/dd"
                      placeholderTextColor="#9b9b9b"
                      onChangeText={handleChange('birthdate')}
                      onBlur={handleBlur('birthdate')}
                      value={values.birthdate}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.birthdate && errors.birthdate}
                  </Text>

                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>Gender</Label>
                    <Input
                      placeholder="Male or Female"
                      placeholderTextColor="#9b9b9b"
                      onChangeText={handleChange('gender')}
                      onBlur={handleBlur('gender')}
                      value={values.gender}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.gender && errors.gender}
                  </Text>

                  <Button dark full rounded onPress={handleSubmit}>
                    <Text>Submit</Text>
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile: profileAction.getProfileDetail,
  updateProfile: profileAction.updateProfile,
  clearMsgUpdate: profileAction.clearAlertMsgUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtError: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
    marginBottom: 10,
    textAlign: 'left',
  },
  toast: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
