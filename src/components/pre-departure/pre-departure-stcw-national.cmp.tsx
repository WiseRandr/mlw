import { useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { usePreDeparture } from "../../store";
import { PreDepartureType } from "../../types";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";
import PreDepartureItemCMP from "./pre-departure-item.cmp";

export default function PreDepartureStcwNationalCMP() {
  const data = usePreDeparture(state => state.data);
  const { pending, completed, skipped } = useMemo(() => (data || []).reduce((all, current) => {
    if (current.category === 'stcw-national') { all[current.status].push(current); }

    return all;
  }, { pending: [] as PreDepartureType[], completed: [] as PreDepartureType[], skipped: [] as PreDepartureType[] }), [data]);
  const sections = useMemo(() => [{ title: 'Pending', data: pending }, { title: 'Completed', data: completed }], [pending]);
  
  return <View style={styles.container}>
    <UIText style={styles.text}>Items should only be ticked off once the corresponding original paper document has been added to your Blue Pouch in preparation for departure.</UIText>

    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section }) => (<UIText style={styles.menu}>{section.title}</UIText>)}
      renderItem={({ item }) => (<PreDepartureItemCMP data={item} />)}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    height: 600
  },
  text: {
    fontStyle: 'italic',
    paddingHorizontal: 25,
    paddingVertical: 20,
    fontSize: FONTS.size.small
  },
  menu: {
    fontWeight: '700',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: COLORS.navy300,
  }
});
