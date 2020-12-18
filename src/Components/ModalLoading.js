import {Spinner} from 'native-base';
import React from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

const ModalLoading = () => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.wrapperSpinner}>
          <Spinner />
          <Text>Loading</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoading;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#00000030',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperSpinner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: '25%',
    width: '50%',
    borderRadius: 10,
  },
});
