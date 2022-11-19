import moment from "moment";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useMyChecklist } from "../../../store";
import COLORS from "../../../ui/colors";
import FONTS from "../../../ui/fonts";
import UIText from "../../../ui/text/text";
import ChecklistCardCMP from "../card.cmp";
import ChecklistTitleCMP from "../title.cmp";
import { MyCheckListType } from "../../../types";
import { useCallback } from "react";
import SwipeModule from "../../../module/swipe/swipe.module";
import TrashSvg from "../../../icon/trash-svg";

export default function MyChecklistCMP() {
  const myChecklist = useMyChecklist(state => state.myChecklist);
  const removeFromChecklist = useMyChecklist(state => state.removeFromChecklist);

  const handleDelete = useCallback((input: MyCheckListType) => () => {
    removeFromChecklist(input);
  }, []);

  return <View>
    <ChecklistTitleCMP title="My Checklists" description="Create your own personal checklist" />

    <FlatList
      style={styles.list}
      data={myChecklist}
      renderItem={({ item }) => (
        <ChecklistCardCMP key={item.id}>
          <SwipeModule
            onPress={handleDelete(item)}
            rightContent={(
              <View style={styles.deleteSwipe}>
                <TrashSvg />
                <UIText style={styles.text}>Delete</UIText>
              </View>)
            }
          >
            <TouchableOpacity style={styles.item}>
              <UIText style={styles.name}>{item.name}</UIText>
              <UIText style={styles.text}>Date created: {moment(item.createdAt).format('DD.MM.YY')}</UIText>
              <UIText style={styles.text}>Last item added: {item.items[item.items.length - 1]}</UIText>
            </TouchableOpacity>
          </SwipeModule>
        </ChecklistCardCMP>
      )}
      keyExtractor={(item) => item.id}
    />
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
  },
  list: {
    height: 450
  }
});
