import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CheckSvg from "../../icon/check-svg";
import TrashSvg from "../../icon/trash-svg";
import { useMyChecklist } from "../../store";
import { TaskType } from "../../types/task.type";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function TaskItemCMP({ checklistId, task }: { checklistId?: string, task: TaskType }) {
  const updateTask = useMyChecklist(store => store.updateTask);
  const deleteTask = useMyChecklist(store => store.deleteTask);
  const handlePushCompleted = useCallback(() => { if (checklistId) updateTask(checklistId, task.id, { status: 'completed' }) }, [checklistId, task, updateTask]);
  const handleDeleteTask = useCallback(() => { if (checklistId) deleteTask(checklistId, task.id) }, [checklistId, task, deleteTask]);

  const rightContent = () => {
    return <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.buttonDelete]} onPress={handleDeleteTask}>
        <TrashSvg />
        <UIText style={styles.buttonText}>Delete</UIText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonDone]} onPress={handlePushCompleted}>
        <CheckSvg />
        <UIText style={styles.buttonText}>Done</UIText>
      </TouchableOpacity>
    </View>;
  };
  
  return <Swipeable renderRightActions={rightContent}>
      <View style={styles.container}>
        <UIText>{task.name}</UIText>
      </View>
    </Swipeable>
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderColor: COLORS.grey,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
  }
});
