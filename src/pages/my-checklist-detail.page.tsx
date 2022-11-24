import { useNavigation, useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useMemo } from "react";
import { When } from "react-if";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import TaskItemCMP from "../components/task/task-item.cmp";
import ChevronLeftSvg from "../icon/chevron-left-svg";
import { useMyChecklist } from "../store";
import { TaskType } from "../types/task.type";
import UIButton from "../ui/button/button";
import COLORS from "../ui/colors";
import FONTS from "../ui/fonts";
import UIText from "../ui/text/text";

export default function MyChecklistDetailPage() {
  // Hooks
  const route = useRoute();
  const navigation = useNavigation();

  // Store
  const myChecklists = useMyChecklist(state => state.myChecklist);

  // Memos
  const id = useMemo(() => (route.params as any)?.id || '', [route]);
  const current = useMemo(() => myChecklists.find((c) => c.id === id), [id, myChecklists]);
  const { todos, completed } = useMemo<{ todos: TaskType[], completed: TaskType[] }>(() => (current?.items || []).reduce((a, c) => {
    if (c.status === 'to-do') a.todos.push(c);
    if (c.status === 'completed') a.completed.push(c);
    return a;
  }, { todos: [] as TaskType[], completed: [] as TaskType[] }), [current]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.headerLeft}><ChevronLeftSvg /><UIText>Lists</UIText></TouchableOpacity>),
      headerRight: () => (<UIButton title={'Edit List'} onPress={() => { if (current) if (current) navigation.navigate('my-checklist-create' as never, { id: current.id } as never) }} />)
    });
  }, [current, navigation]);

  return <View>
    <When condition={Boolean(current)}>
      <UIText style={styles.title}>{current?.name}</UIText>

      <View>
        <When condition={todos.length > 0 && completed.length > 0}>
          <UIText style={styles.menu}>To-dos</UIText>
        </When>
        <FlatList renderItem={({ item }) => <TaskItemCMP task={item} checklistId={current?.id} />} data={todos} keyExtractor={(item) => item.id} ItemSeparatorComponent={() => <View style={styles.seperator} />} />
        
        <When condition={completed.length > 0}>
          <UIText style={styles.menu}>Completed</UIText>
        </When>

        <FlatList renderItem={({ item }) => <TaskItemCMP task={item} checklistId={current?.id} isCompelted />} data={completed} keyExtractor={(item) => item.id} ItemSeparatorComponent={() => <View style={styles.seperator} />} />
      </View>
    </When>
  </View>
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    fontWeight: '700',
    fontSize: FONTS.size.large
  },
  menu: {
    fontWeight: '600',
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 25,
    fontSize: FONTS.size.small,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginBottom: 1
  },
  itemText: {
    fontSize: FONTS.size.normal
  },
  itemTextCompleted: {
    color: COLORS.grey
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  seperator: {
    flex: 1,
    height: 1,
  },
  unCheck: {

  }
});
