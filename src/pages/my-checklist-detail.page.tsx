import { useNavigation, useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useMemo } from "react";
import { When } from "react-if";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ChevronLeftSvg from "../icon/chevron-left-svg";
import { useMyChecklist } from "../store";
import { TaskType } from "../types/task.type";
import UIButton from "../ui/button/button";
import COLORS from "../ui/colors";
import FONTS from "../ui/fonts";
import UIText from "../ui/text/text";

export default function MyChecklistDetailPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = useMemo(() => (route.params as any)?.id || '', [route]);
  const myChecklists = useMyChecklist(state => state.myChecklist);
  const current = useMemo(() => myChecklists.find((c) => c.id === id), [id]);
  const { todos, completed } = useMemo<{ todos: TaskType[], completed: TaskType[] }>(() => (current?.items || []).reduce((a, c) => {
    if (c.status === 'to-do') a.todos.push(c);
    if (c.status === 'completed') a.completed.push(c);
    return a;
  }, { todos: [] as TaskType[], completed: [] as TaskType[] }), [current]);

  const goBack = useCallback(() => { navigation.goBack() }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={goBack} style={styles.headerLeft}><ChevronLeftSvg /><UIText>Lists</UIText></TouchableOpacity>),
      headerRight: () => (<UIButton title="Edit List" />)
    });
  }, []);

  return <View>
    <When condition={Boolean(current)}>
      <UIText style={styles.title}>{current?.name}</UIText>

      <View>
        <When condition={todos.length > 0 && completed.length > 0}>
          <UIText style={styles.menu}>To-dos</UIText>
        </When>
        {todos.map((todo) => (
          <View key={todo.id} style={styles.item}>
            <UIText style={styles.itemText}>{todo.name}</UIText>
          </View>
        ))}

        <When condition={todos.length > 0 && completed.length > 0}>
          <UIText style={styles.menu}>Completed</UIText>
        </When>
        {completed.map((comp) => (
          <View key={comp.id} style={styles.item}>
            <UIText style={[styles.itemText, styles.itemTextCompleted]}>{comp.name}</UIText>
          </View>
        ))}
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
  },
  itemText: {
    fontSize: FONTS.size.normal
  },
  itemTextCompleted: {
    color: COLORS.grey
  }
});
