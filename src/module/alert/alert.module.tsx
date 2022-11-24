import { useCallback, useEffect, useState } from "react";
import { Then, If, Else } from "react-if";
import { Dimensions, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import DoneSvg from "../../icon/done-svg";
import COLORS from "../../ui/colors";
import UIText from "../../ui/text/text";

export default function AlertModule({ visible, text, onClose, onDone }: { visible: boolean, text: string, onClose: () => void, onDone: () => void }) {
  const [done, setDone] = useState<boolean>(false);
  const handleDone = useCallback(() => {
    setDone(true);
    const tm = setTimeout(() => {
      onDone();
      clearTimeout(tm);
    }, 1000);
  }, [onDone]);

  useEffect(() => { setDone(false) }, [visible]);
  
  return <Modal visible={visible} transparent>
    <View style={styles.content}>
      <View style={styles.background} />
      <If condition={done}>
        <Then>
          <DoneSvg />
        </Then>
        <Else>
          <View style={styles.container}>
            <UIText style={styles.text}>{text}</UIText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.buttonSelf, styles.buttonLeft]} onPress={onClose}><UIText style={styles.buttonText}>No</UIText></TouchableOpacity>
              <TouchableOpacity style={[styles.buttonSelf, styles.buttonRight]}  onPress={handleDone}><UIText style={[styles.buttonText, styles.buttonRightText]}>Yes</UIText></TouchableOpacity>
            </View>
          </View>
        </Else>
      </If>
    </View>
  </Modal>;
}

const styles = StyleSheet.create({
  background: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    position: 'absolute',
    backgroundColor: COLORS.navy800,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: Dimensions.get('screen').width - 130,
    backgroundColor: COLORS.alertBackground,
    borderRadius: 6,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  buttonSelf: {
    width: '50%',
    borderColor: COLORS.borderColor,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center'
  },
  buttonText: {
    color: COLORS.blue2,
    fontWeight: '500'
  },
  buttonLeft: {
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  buttonRight: {
    borderTopWidth: 1,
  },
  buttonRightText: {
    fontWeight: '700',
  }
});
