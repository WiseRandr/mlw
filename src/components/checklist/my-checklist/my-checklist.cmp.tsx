import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../../../ui/colors";
import FONTS from "../../../ui/fonts";
import UIText from "../../../ui/text/text";
import ChecklistCardCMP from "../card.cmp";
import ChecklistTitleCMP from "../title.cmp";

export default function MyChecklistCMP() {
  const fakeData = useMemo(() => ([
    { id: 1, name: 'Restaurants to visit in France', creationDate: new Date('2022-11-17'), items: ['La Parfait'] },
    { id: 2, name: 'Things to do in german', creationDate: new Date('2022-11-16'), items: ['Visit the park'] }
  ]), []);
  
  return <View>
    <ChecklistTitleCMP title="My Checklists" description="Create your own personal checklist" />

    <View>
      {fakeData.map((checklist) => (
        <ChecklistCardCMP key={checklist.id}>
          <View>
            <View>
              <UIText style={styles.name}>{checklist.name}</UIText>
              <UIText style={styles.text}>Date created: {checklist.items[checklist.items.length - 1]}</UIText>
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
