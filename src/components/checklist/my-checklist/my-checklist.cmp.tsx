import moment from "moment";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useMyChecklist } from "../../../store";
import COLORS from "../../../ui/colors";
import FONTS from "../../../ui/fonts";
import UIText from "../../../ui/text/text";
import ChecklistCardCMP from "../card.cmp";
import ChecklistTitleCMP from "../title.cmp";
import { Swipeable } from "react-native-gesture-handler";
import { MyCheckListType } from "../../../types";
import { useCallback, useRef } from "react";
import SwipeModule from "../../../module/swipe/swipe.module";
import TrashSvg from "../../../icon/trash-svg";

export default function MyChecklistCMP() {
  const swipeRef = useRef<Swipeable>(undefined as any);
  const myChecklist = useMyChecklist(state => state.myChecklist);
  const removeFromChecklist = useMyChecklist(state => state.removeFromChecklist);

  const handleDelete = useCallback((input: MyCheckListType) => () => {
    removeFromChecklist(input);
  }, []);

  const handlePress = useCallback(() => {
    if (swipeRef.current) swipeRef.current.openRight();
  }, []);

  return <View>
    <ChecklistTitleCMP title="My Checklists" description="Create your own personal checklist" />

    <View>
      {myChecklist.map((checklist) => (
        <ChecklistCardCMP key={checklist.id}>
          <SwipeModule
            onPress={handleDelete(checklist)}
            rightContent={(
              <View style={styles.deleteSwipe}>
                <TrashSvg />
                <UIText style={styles.text}>Delete</UIText>
              </View>)
            }
          >
            <TouchableOpacity style={styles.item} onPress={handlePress}>
              <UIText style={styles.name}>{checklist.name}</UIText>
              <UIText style={styles.text}>Date created: {moment(checklist.createdAt).format('DD.MM.YY')}</UIText>
              <UIText style={styles.text}>Last item added: {checklist.items[checklist.items.length - 1]}</UIText>
            </TouchableOpacity>
          </SwipeModule>
        </ChecklistCardCMP>
      ))}
    </View>
  </View>
}

const styles = StyleSheet.create({
  name: {
    marginBottom: 5,
  },
  text  : {
    color: COLORS.grey,
    fontSize: FONTS.size.small
  },
  deleteSwipe: {
    flex: 1,
    backgroundColor: COLORS.red500,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  swipeText: {
    color: COLORS.white
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    height: '100%',
  }
});
