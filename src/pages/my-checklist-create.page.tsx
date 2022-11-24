import uuid from 'react-native-uuid';
import { useNavigation, useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import ChevronLeftSvg from "../icon/chevron-left-svg";
import TaskSvg from "../icon/task-svg";
import { useMyChecklist } from "../store";
import { TaskType } from "../types";
import UIButton from "../ui/button/button";
import COLORS from "../ui/colors";
import FONTS from "../ui/fonts";
import UIText from "../ui/text/text";

export default function MyChecklistCreatePage() {
  const route = useRoute();
  const navigation = useNavigation();
  const pushToChecklist = useMyChecklist(state => state.pushToChecklist);
  const name = useMemo(() => (route.params as any)?.name || '', [route]);
  const [tasks, setTasks] = useState<string[]>(['']);

  const handleChange = useCallback((index: number) => (text: string) => {
    const newTasks = [...tasks];
    newTasks[index] = text;
    if (text && !newTasks.includes('')) newTasks.push('');
    setTasks(newTasks);
  }, [tasks]);

  const onSave = useCallback(() => {
    const id = uuid.v4() as string;
    pushToChecklist({ id, name, createdAt: new Date(), items: tasks.filter((t) => t).map((t) => ({
        id: uuid.v4() as string,
        name: t,
        status: 'to-do'
      }))
    });

    navigation.navigate('my-checklist-detail' as never, { id } as never);
  }, [tasks, name, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}><ChevronLeftSvg /><UIText>Cancel</UIText></TouchableOpacity>),
      headerRight: () => (<UIButton title={'Save'} onPress={onSave} full />)
    });
  }, [onSave]);

  return <View>
    <UIText style={styles.headerTitle}>{name}</UIText>

    <View>
        {
          tasks.map((t, i) => <View key={i} style={styles.inputContainer}>
            <TaskSvg />
            <TextInput placeholder="bla" style={styles.input} value={tasks[i]} onChangeText={handleChange(i)} />
          </View>)
        }
    </View>
  </View>;
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '800',
    fontSize: FONTS.size.large,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  inputContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
  },
  input: {
    marginLeft: 15,
    width: '100%'
  }
});
