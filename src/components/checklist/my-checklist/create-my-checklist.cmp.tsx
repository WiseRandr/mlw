import { useNavigation } from "@react-navigation/core";
import { useCallback, useEffect, useState } from "react";
import { When } from "react-if";
import { Modal, StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import ChevronLeftSvg from "../../../icon/chevron-left-svg";
import UIButton from "../../../ui/button/button";
import COLORS from "../../../ui/colors";
import UITextInput from "../../../ui/inputs/text-input";

export default function CreateMyChecklistCMP({ visible, close }: { visible: boolean, close: () => void }) {
  const navigation = useNavigation();
  const [value, setValue] = useState<string>('');

  const onChangeText = useCallback((text: string) => { setValue(text); }, []);
  const onClear = useCallback(() => { setValue('') }, []);

  const onDone = useCallback(() => {
    if (value) {
      navigation.navigate('my-checklist-create' as never, { name: value } as never);
      close();
    }
  }, [value, navigation, close]);

  useEffect(() => { setValue('') }, []);
  
  return <Modal animationType="fade" visible={visible} transparent>
    <SafeAreaView style={styles.container}>
      <View style={styles.background} />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={close} style={styles.closeButton}><ChevronLeftSvg /></TouchableOpacity>
          <When condition={value}><UIButton title="Done" full onPress={onDone} /></When>
        </View>

        <View style={styles.input}>
          <UITextInput placeholder="Insert list's title" value={value} onChangeText={onChangeText} onClear={onClear} />
        </View>
      </View>
    </SafeAreaView>
  </Modal>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: COLORS.white,
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  input: {
    marginTop: 50,
  }
});
