import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PressableText} from '../atoms/PressableText';
import { COLOR } from '../../styles/Theme';

type Props = {
  actionButton: {
    title: string;
    onPress: () => void;
  };
  closeButton: {
    title: string;
    close: () => void;
  };
  text: string;
  isVisible: boolean;
};

export const CustomModal = (props: Props) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.closeButton.close}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.text}</Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button]}
              onPress={props.actionButton.onPress}>
              <Text style={styles.textStyle}>{props.actionButton.title}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonRight]}
              onPress={props.closeButton.close}>
              <Text style={styles.textStyle}>{props.closeButton.title}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  modalView: {
    height: '17%',
    width: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between'
  },
  textStyle: {
    color: COLOR.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17
  },
  modalText: {
    padding: 15,
    color: COLOR.black,
    fontSize: 17
  },
  button: {
    padding: 10,
    borderColor: COLOR.black,
    borderTopWidth: 1,
    flex: 1
  },
  buttonRight:{
    borderLeftWidth: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  }
});
