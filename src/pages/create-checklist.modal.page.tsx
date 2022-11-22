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
import ChevronLeftSvg from "../icon/chevron-left-svg";
import UIButton from "../ui/button/button";

export default function CreateChecklistModalPage() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const pushToChecklist = useMyChecklist(state => state.pushToChecklist);

  const handleChange = useCallback((value: string) => { setTitle(value); }, []);

  const handleSubmit = useCallback(() => {
    pushToChecklist({ id: uuid.v4() as string, name: title, createdAt: new Date(), items: [] });
    navigation.navigate('pre-create-checklist' as never);
  }, [title, navigation]);

  const handleClear = useCallback(() => { setTitle('') }, []);

  const goBack = useCallback(() => { navigation.goBack() }, [navigation]);
  
  return <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity style={styles.chevronContainer} onPress={goBack}>
        <ChevronLeftSvg />
      </TouchableOpacity>
      <When condition={title}>
        <UIButton full title="Done" onPress={handleSubmit} />
      </When>
    </View>
    <View>
      <UITextInput value={title} onChangeText={handleChange} placeholder="Insert list's title" onClear={handleClear} />
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
  chevronContainer: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  }
});