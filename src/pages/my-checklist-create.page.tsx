import uuid from 'react-native-uuid';
import { useNavigation, useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import ChevronLeftSvg from "../icon/chevron-left-svg";
import TaskSvg from "../icon/task-svg";
import { useMyChecklist } from "../store";
import UIButton from "../ui/button/button";
import COLORS from "../ui/colors";
import FONTS from "../ui/fonts";
import UIText from "../ui/text/text";

export default function MyChecklistCreatePage() {
  const route = useRoute();
  const navigation = useNavigation();
  const pushToChecklist = useMyChecklist(state => state.pushToChecklist);
  const removeFromChecklist = useMyChecklist(state => state.removeFromChecklist);

  const checklistId = useMemo(() => (route.params as any)?.id || uuid.v4() as string, [route]);
  const myChecklist = useMyChecklist(state => state.myChecklist);
  const current = useMemo(() => myChecklist.find((c) => c.id === checklistId), [checklistId, myChecklist]);
  const name = useMemo(() => (current?.name) || (route.params as any)?.name || '', [current, route]);
  const [tasks, setTasks] = useState<string[]>((current?.items || []).filter((i) => i.status !== 'completed').map(i => i?.name || '').concat(['']));

  const handleChange = useCallback((index: number) => (text: string) => {
    const newTasks = [...tasks];
    newTasks[index] = text;
    if (text && !newTasks.includes('')) newTasks.push('');
    setTasks(newTasks);
  }, [tasks]);

  const onSave = useCallback(() => {
    if (current) { removeFromChecklist(current); }
    
    pushToChecklist({
      id: checklistId,
      name,
      createdAt: new Date(),
      items: (current?.items || []).filter((i) => i.status === 'completed').concat(tasks.filter((t) => t).map((t) => ({
        id: uuid.v4() as string,
        name: t,
        status: 'to-do'
      })))
    });

    (navigation as any).replace('my-checklist-detail' as never, { id: checklistId } as never);
  }, [tasks, name, navigation, checklistId, current]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.headerLeft}><ChevronLeftSvg /><UIText>Cancel</UIText></TouchableOpacity>),
      headerRight: () => (<UIButton title={'Save'} onPress={onSave} full />)
    });
  }, [onSave]);

  return <View>
    <UIText style={styles.headerTitle}>{name}</UIText>

    <View>
      {
        tasks.map((t, i) => <View key={i} style={styles.inputContainer}>
          <TaskSvg />
          <TextInput placeholder="Add new task" style={styles.input} value={tasks[i]} onChangeText={handleChange(i)} />
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
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
