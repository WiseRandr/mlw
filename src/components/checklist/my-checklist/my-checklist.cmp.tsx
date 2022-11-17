import moment from "moment";
import { StyleSheet, View } from "react-native";
import { useMyChecklist } from "../../../store";
import COLORS from "../../../ui/colors";
import FONTS from "../../../ui/fonts";
import UIText from "../../../ui/text/text";
import ChecklistCardCMP from "../card.cmp";
import ChecklistTitleCMP from "../title.cmp";

export default function MyChecklistCMP() {
  const myChecklist = useMyChecklist(state => state.myChecklist);

  return <View>
    <ChecklistTitleCMP title="My Checklists" description="Create your own personal checklist" />

    <View>
      {myChecklist.map((checklist) => (
        <ChecklistCardCMP key={checklist.id}>
          <View>
            <View>
              <UIText style={styles.name}>{checklist.name}</UIText>
              <UIText style={styles.text}>Date created: {moment(checklist.createdAt).format('DD.MM.YY')}</UIText>
              <UIText style={styles.text}>Last item added: {checklist.items[checklist.items.length - 1]}</UIText>
            </View>
            <View></View>
          </View>
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
  }
});
