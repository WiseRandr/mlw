import { useCallback } from "react";
import { Else, If, Then } from "react-if";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CheckSvg from "../../icon/check-svg";
import TaskSvg from "../../icon/task-svg";
import TrashSvg from "../../icon/trash-svg";
import UnCheckSvg from "../../icon/uncheck-svg";
import { useMyChecklist } from "../../store";
import { TaskType } from "../../types/task.type";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function TaskItemCMP({ checklistId, task, isCompelted = false }: { checklistId?: string, task: TaskType, isCompelted?: boolean }) {
  const updateTask = useMyChecklist(store => store.updateTask);
  const deleteTask = useMyChecklist(store => store.deleteTask);
  const handlePushCompleted = useCallback(() => { if (checklistId) updateTask(checklistId, task.id, { status: 'completed' }) }, [checklistId, task, updateTask]);
  const handleDeleteTask = useCallback(() => { if (checklistId) deleteTask(checklistId, task.id) }, [checklistId, task, deleteTask]);
  const handlePushTodo = useCallback(() => { if (checklistId) updateTask(checklistId, task.id, { status: 'to-do' }) }, [checklistId, updateTask]);

  const rightContent = () => {
    return <If condition={isCompelted}>
      <Then>
        <TouchableOpacity style={[styles.button, styles.buttonDone]} onPress={handlePushTodo}>
          <UnCheckSvg />
          <UIText style={styles.buttonText}>Uncheck</UIText>
        </TouchableOpacity>
      </Then>
      <Else>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={handleDeleteTask}>
          <TrashSvg />
          <UIText style={styles.buttonText}>Delete</UIText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonDone]} onPress={handlePushCompleted}>
          <CheckSvg />
          <UIText style={styles.buttonText}>Done</UIText>
        </TouchableOpacity>
      </View>
    </Else>
    </If>;
  };
  
  return <Swipeable renderRightActions={rightContent}>
      <View style={styles.container}>
        <View style={styles.icon}><TaskSvg /></View>
        <UIText style={[styles.name, isCompelted && styles.nameCompleted]}>{task.name}</UIText>
      </View>
    </Swipeable>
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderColor: COLORS.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'red'
  },
  button: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    marginTop: 5,
    fontSize: FONTS.size.small,
  },
  buttonDelete: {
    backgroundColor: COLORS.red500,
  },
  buttonDone: {
    backgroundColor: COLORS.green600
  },
  icon: {
    marginRight: 20,
  },
  name: {
    fontSize: FONTS.size.normal
  },
  nameCompleted: {
    color: COLORS.grey,
  }
});
