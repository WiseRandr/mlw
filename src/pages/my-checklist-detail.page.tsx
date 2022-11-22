import { useNavigation, useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { When } from "react-if";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import uuid from 'react-native-uuid';
import TaskItemCMP from "../components/task/task-item.cmp";
import ChevronLeftSvg from "../icon/chevron-left-svg";
import SwipeModule from "../module/swipe/swipe.module";
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
  const pushTask = useMyChecklist(state => state.pushTask);
  const updateTask = useMyChecklist(state => state.updateTask);

  // States
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTaskInput, setNewTaskInput] = useState<string>('');

  // Memos
  const id = useMemo(() => (route.params as any)?.id || '', [route]);
  const current = useMemo(() => myChecklists.find((c) => c.id === id), [id, myChecklists]);
  const { todos, completed } = useMemo<{ todos: TaskType[], completed: TaskType[] }>(() => (current?.items || []).reduce((a, c) => {
    if (c.status === 'to-do') a.todos.push(c);
    if (c.status === 'completed') a.completed.push(c);
    return a;
  }, { todos: [] as TaskType[], completed: [] as TaskType[] }), [current]);

  const clearEditing = useCallback(() => {
    setIsEditing(false);
    setNewTaskInput('');
  }, []);
  
  const leftOnPress = useCallback(() => {
    if (!isEditing) navigation.goBack();
    else clearEditing();
  }, [isEditing, clearEditing]);

  const rightOnPress = useCallback(() => {
    if (!isEditing) setIsEditing(true);
    else {
      if (newTaskInput && current) {
        pushTask(current.id, { id: uuid.v4() as string, name: newTaskInput, status: 'to-do' });
        clearEditing();
      }
    }
  }, [newTaskInput, isEditing, current, pushTask, clearEditing]);

  const handleChange = useCallback((text: string) => { setNewTaskInput(text); }, []);

  const handlePushTodo = useCallback((task: TaskType) => () => { if (current) updateTask(current.id, task.id, { status: 'to-do' }) }, [current, updateTask]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={leftOnPress} style={styles.headerLeft}><ChevronLeftSvg /><UIText>{isEditing ? 'Cancel' : 'Lists'}</UIText></TouchableOpacity>),
      headerRight: () => (<UIButton title={isEditing ? 'Save' : 'Edit List'} onPress={rightOnPress} />)
    });
  }, [isEditing, rightOnPress, leftOnPress]);

  return <View>
    <When condition={Boolean(current)}>
      <UIText style={styles.title}>{current?.name}</UIText>

      <View>
        <When condition={todos.length > 0 && completed.length > 0 && !isEditing}>
          <UIText style={styles.menu}>To-dos</UIText>
        </When>
        <FlatList renderItem={({ item }) => <TaskItemCMP task={item} checklistId={current?.id} />} data={todos} keyExtractor={(item) => item.id} ItemSeparatorComponent={() => <View style={styles.seperator} />} />
        
        <When condition={isEditing}>
          <TextInput style={styles.input} placeholder="Task" value={newTaskInput} onChangeText={handleChange} />
        </When>

        <When condition={todos.length > 0 && completed.length > 0 && !isEditing}>
          <UIText style={styles.menu}>Completed</UIText>
        </When>
        <When condition={!isEditing}>
          {completed.map((comp) => (
            <View key={comp.id} style={styles.item}>
              <SwipeModule rightContent={<View><UIText>Uncheck</UIText></View>} onPress={handlePushTodo(comp)}>
                <UIText style={[styles.itemText, styles.itemTextCompleted]}>{comp.name}</UIText>
              </SwipeModule>
            </View>
          ))}
        </When>
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
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  item: {
    borderTopWidth: 1,
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
  }
});
