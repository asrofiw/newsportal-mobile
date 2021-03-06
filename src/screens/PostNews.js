import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {View, Text, Input, Button, Item, Label, Toast} from 'native-base';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import * as yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';

// Import Action
import newsAction from '../redux/actions/news';

// Import component
import ModalLoading from '../Components/ModalLoading';

const formSchema = yup.object({
  headline: yup.string().required('headline required'),
  city: yup.string().required('city required'),
  category: yup.string().required('category required'),
  body: yup.string().required('content required'),
});

export class PostNews extends Component {
  state = {
    headline: '',
    city: '',
    category: '',
    body: '',
    image: null,
  };

  openGallery = () => {
    const option = {
      noData: true,
      saveToPhotos: true,
      mediaType: 'photo',
    };
    ImagePicker.launchImageLibrary(option, (res) => {
      if (
        res.didCancel ||
        res.error ||
        res.customButton ||
        res.errorMessage ||
        res.errorCode
      ) {
        console.log(res);
      } else {
        console.log(res);
        this.setState({image: res});
      }
    });
  };

  onResetState = () => {
    this.setState({
      headline: '',
      city: '',
      category: '',
      body: '',
      image: null,
    });
  };

  componentDidUpdate() {
    const {
      isPostNewsSuccess,
      isPostNewsFailed,
      alertMsgPostNews,
    } = this.props.news;
    if (isPostNewsSuccess) {
      Toast.show({
        text: alertMsgPostNews,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.props.clearMsg();
      this.onResetState();
    }
    if (isPostNewsFailed) {
      Toast.show({
        text: alertMsgPostNews,
        buttonText: 'Ok',
        style: styles.toast,
        duration: 3000,
      });
      this.props.clearMsg();
    }
  }
  render() {
    const {headline, city, category, body, image} = this.state;
    const {token} = this.props.auth;
    return (
      <ScrollView removeClippedSubviews={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.parent}>
            {this.props.news.isLoadingPostNews && <ModalLoading />}
            <Text style={styles.title}>Create News</Text>
            <Formik
              initialValues={{
                headline: headline,
                city: city,
                category: category,
                body: body,
              }}
              validationSchema={formSchema}
              onSubmit={async (values) => {
                try {
                  const form = new FormData();
                  if (image) {
                    form.append('headline', values.headline);
                    form.append('city', values.city);
                    form.append('category', values.category);
                    form.append('body', values.body);
                    form.append('image', {
                      uri: image.uri,
                      type: image.type,
                      name: image.fileName,
                    });
                    await this.props.postNews(token, form);
                  } else {
                    Toast.show({
                      text: 'Input image first',
                      buttonText: 'Ok',
                      style: styles.toast,
                      duration: 3000,
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
                      numberOfLines={5}
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
                    onPress={this.openGallery}
                    style={styles.btnChooseImg}>
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
  clearMsg: newsAction.clearMsg,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostNews);

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
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 5,
  },
  inputBody: {
    borderColor: 'black',
    borderWidth: 0.5,
    marginTop: 5,
    justifyContent: 'flex-start',
  },
  btnChooseImg: {
    alignItems: 'center',
    marginBottom: 20,
  },
  txtBtnImg: {
    textTransform: 'capitalize',
  },
  img: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  toast: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
