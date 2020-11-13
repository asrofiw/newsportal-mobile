import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import {View, Text, Input, Button, Item, Label, Toast} from 'native-base';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import * as yup from 'yup';
import styles from './style';
import ImagePicker from 'react-native-image-picker';

// Import Action
import newsAction from '../../redux/actions/news';

const formSchema = yup.object({
  headline: yup.string().required('headline required'),
  city: yup.string().required('city required'),
  category: yup.string().required('category required'),
  body: yup.string().required('content required'),
});

export class PostNews extends Component {
  state = {
    image: null,
  };

  handleChoosePhoto = () => {
    const option = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(option, (res) => {
      if (res.uri) {
        this.setState({image: res});
      }
    });
  };

  componentDidUpdate() {
    const {
      isPostNewsSuccess,
      isPostNewsFailed,
      alertMsgPostNews,
    } = this.props.news;
    if (isPostNewsSuccess || isPostNewsFailed) {
      Toast.show({
        text: alertMsgPostNews,
        buttonText: 'Ok',
      });
      this.props.clearMsg();
    }
  }
  render() {
    const {image} = this.state;
    const {token} = this.props.auth;
    return (
      <ScrollView style={styles.parent}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Create News</Text>
            <Formik
              initialValues={{
                headline: '',
                city: '',
                category: '',
                body: '',
              }}
              validationSchema={formSchema}
              onSubmit={(values) => {
                const form = new FormData();
                form.append('headline', values.headline);
                form.append('city', values.city);
                form.append('category', values.category);
                form.append('body', values.body);
                form.append('image', {
                  uri: image.uri,
                  type: image.type,
                  name: image.fileName,
                });
                this.props.postNews(token, form);
                console.log(form);
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
                    <Label style={styles.label}>Headline</Label>
                    <Input
                      placeholder="Headline"
                      onChangeText={handleChange('headline')}
                      onBlur={handleBlur('headline')}
                      value={values.headline}
                      style={styles.input}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.headline && errors.headline}
                  </Text>

                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>City</Label>
                    <Input
                      placeholder="City"
                      onChangeText={handleChange('city')}
                      onBlur={handleBlur('city')}
                      value={values.city}
                      style={styles.input}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.city && errors.city}
                  </Text>

                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>Cateogry</Label>
                    <Input
                      placeholder="Category"
                      onChangeText={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                      style={styles.input}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.category && errors.category}
                  </Text>

                  <Item stackedLabel style={styles.item}>
                    <Label style={styles.label}>Body</Label>
                    <Input
                      multiline={true}
                      placeholder="Content goes here..."
                      onChangeText={handleChange('body')}
                      onBlur={handleBlur('body')}
                      value={values.body}
                      style={styles.inputBody}
                    />
                  </Item>
                  <Text style={styles.txtError}>
                    {touched.body && errors.body}
                  </Text>

                  <Button
                    success
                    full
                    transparent
                    onPress={this.handleChoosePhoto}>
                    <Text style={styles.txtBtnImg}>Choose Image</Text>
                  </Button>
                  {image && <Image source={image} style={styles.img} />}

                  <Button dark full rounded onPress={handleSubmit}>
                    <Text>Submit</Text>
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  news: state.news,
});

const mapDispatchToProps = {
  postNews: newsAction.postNews,
  clearMsg: newsAction.clearMsgPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostNews);
