import { useCallback, useState } from "react";
import { When } from "react-if";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { useMyChecklist } from "../store";
import COLORS from "../ui/colors";
import UITextInput from "../ui/inputs/text-input";
import UIText from "../ui/text/text";
import uuid from 'react-native-uuid';

export default function CreateChecklistPage() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const pushToChecklist = useMyChecklist(state => state.pushToChecklist);

  const handleChange = useCallback((value: string) => { setTitle(value); }, []);

  const handleSubmit = useCallback(() => {
    pushToChecklist({ id: uuid.v4() as string, name: title, createdAt: new Date(), items: [] });
    navigation.goBack();
  }, [title, navigation]);

  const handleClear = useCallback(() => { setTitle('') }, []);
  
  return <View style={styles.container}>
    <View style={styles.header}>
      <View>
        <UIText>back</UIText>
      </View>
      <When condition={title}>
        <TouchableOpacity style={styles.done} onPress={handleSubmit}>
          <UIText style={styles.doneText}>Done</UIText>
        </TouchableOpacity>
      </When>
    </View>
    <View>
      <UITextInput value={title} onChangeText={handleChange} placeholder="Enter list's title" onClear={handleClear} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 45,
    paddingHorizontal: 16,
    backgroundColor: COLORS.navy800,
  },
  header: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  done: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: COLORS.blue
  },
  doneText: {
    fontWeight: '700',
    color: COLORS.white,
  }
});
