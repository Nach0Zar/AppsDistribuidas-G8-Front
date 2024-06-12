import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useContext, useState} from 'react';
import {PressableText} from '../atoms/PressableText';
import { COLOR } from '../../styles/Theme';
import {BlurView} from '@react-native-community/blur';
import { faAngleDown, faAngleUp, faCircleChevronDown,faCircleChevronUp, faCircleXmark,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import COLORS from '../../styles/Theme';


type Props = {
  actionButton: {
    onPress: () => void;
  };
  closeButton: {
    close: () => void;
  };
  isVisible: boolean;
  onSave: (x:string|null,y:string|null) => void;
};

export const FiltterModal = (props: Props) => { 
  const [yearUp, setYearUp] = useState(false); 
  const [calificationUp, setCalificationUp] = useState(false);
  const [yearDown, setYearDown] = useState(false); 
  const [calificationDown, setCalificationDown] = useState(false);
  
  const [releaseSort,setReleaseSort] = useState<string|null>(null);
  const [qualificationSort,setQualificationSort] = useState<string|null>(null);

  const setateYearUP = () => {
    if (yearUp){
      setYearUp(false);
      setReleaseSort(null);
    }else{
      setYearUp(true);
      setYearDown(false);
      setReleaseSort('release.desc');
    }
  }

  const setateYearDown = () =>{
    if (yearDown){
      setYearDown(false);
      setReleaseSort(null);
    }else{
      setYearDown(true);
      setYearUp(false);
      setReleaseSort('release.asc');
    }
  }

  const setateCalificationUp = () => {
    if (calificationUp){
      setCalificationUp(false);
      setQualificationSort(null);
    }else{
      setCalificationUp(true);
      setCalificationDown(false);
      setQualificationSort('qualification.desc');
    }
  }

  const setateCalificationDown = () => {
    if (calificationDown){
      setCalificationDown(false);
      setQualificationSort(null);
    }else{
      setCalificationDown(true);
      setCalificationUp(false);
      setQualificationSort('qualification.asc');
    }
  }

  const restState = () => {
      if (!yearUp && !calificationUp && !yearDown && !calificationDown){
        props.onSave(releaseSort,qualificationSort);
        props.closeButton.close(); 
      }else{
        setYearUp(false);
        setYearDown(false);
        setReleaseSort(null);
        setCalificationUp(false);
        setCalificationDown(false);
        setQualificationSort(null);
      }
  }

  const confirm = () => {
    props.onSave(releaseSort,qualificationSort);
    props.actionButton.onPress();
    props.closeButton.close();
  }

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.isVisible}
      >
      <BlurView
      style={{
        width: '100%',
        height: '100%',
        alignSelf:'center',
        borderRadius:20,
        borderWidth:.1

       }}
       blurType="light"
       blurAmount={20}
      > 
      <View style={styles.centeredView}>
        <Text style={styles.modalText}>Ordenar por ...</Text>         
        <View style={styles.modalView}>
          <Text style={styles.filttreText}>Año de publicación</Text>
          <View style={styles.modalButtons}>
            <Pressable
              style={[styles.button]}
              onPress={setateYearUP}>
              <FontAwesomeIcon icon={yearUp ? faCircleChevronUp:faAngleUp} size={50} color={COLORS.white}/>
            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={setateYearDown}>
              <FontAwesomeIcon icon={yearDown ? faCircleChevronDown:faAngleDown} size={50} color={COLORS.white}/>
            </Pressable>
          </View>
        </View>
        <View style={styles.modalView}>
        <Text style={styles.filttreText}>Calificación</Text>
        <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button]}
                onPress={setateCalificationUp}>
                <FontAwesomeIcon icon={calificationUp ? faCircleChevronUp:faAngleUp} size={50} color={COLORS.white}/>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={setateCalificationDown}>
                <FontAwesomeIcon icon={calificationDown ? faCircleChevronDown:faAngleDown} size={50} color={COLORS.white}/>
              </Pressable>
        </View>
        </View>
        <View style={styles.space}></View>
        <View style={styles.confirmButtons}>
          <View style={styles.modalButtons}> 
              <Pressable
                style={[styles.button]}
                onPress={restState}>
                <FontAwesomeIcon icon={faCircleXmark} size={80} color={COLORS.red}/>
              </Pressable>
              <Pressable
                style={[styles.button]}
                onPress={confirm}>
                <FontAwesomeIcon icon={faCircleCheck} size={80} color={COLORS.green}/>
              </Pressable>
          </View>
        </View>
      </View>
      </BlurView> 
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
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'space-between'
  },
  textStyle: {
    color: COLOR.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    padding: 100
  },
  modalText: {
    padding: 100,
    color: COLORS.white,
    fontSize: 23
  },
  filttreText: {
    padding: 15,
    textAlign:'center',
    color: COLORS.white,
    fontSize: 23
  },
  button: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    minHeight: 200,
    fontSize:200
  },
  buttonRight:{
    borderLeftWidth: 1,
  },
  modalButtons: {
      flexDirection: 'row',
      borderBottomStartRadius: 5,
      borderBottomEndRadius: 5,
      textAlign:'center',
    },
  confirmButtons:{
    height: '17%',
    width: '70%',
    margin: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: 'space-between'
  },
  space: {
    height: 150, 
  },
});
