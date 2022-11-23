import { useMemo } from "react";
import { When } from "react-if";
import { StyleSheet, View } from "react-native";
import { usePreDeparture } from "../../store";
import { PreDepartureType } from "../../types";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function PreDepartureStcwNationalCMP() {
  const data = usePreDeparture(state => state.data);
  const { pending, completed, skipped } = useMemo(() => (data || []).reduce((all, current) => {
    if (current.category === 'stcw-national') { all[current.status].push(current); }

    return all;
  }, { pending: [] as PreDepartureType[], completed: [] as PreDepartureType[], skipped: [] as PreDepartureType[] }), [data]);
  
  return <View>
    <UIText style={styles.text}>Items should only be ticked off once the corresponding original paper document has been added to your Blue Pouch in preparation for departure.</UIText>

    <When condition={pending.length > 0}>
      <UIText style={styles.menu}>Pending</UIText>
      
      {pending.map((p) => (
        <View key={p.id}>
          <UIText>{p.name}</UIText>
        </View>
      ))}
    </When>

    <When condition={completed.length > 0}>
      <UIText style={styles.menu}>Completed</UIText>
      
      {completed.map((p) => (
        <View key={p.id}>
          <UIText>{p.name}</UIText>
        </View>
      ))}
    </When>

    <When condition={skipped.length > 0}>
      <UIText style={styles.menu}>Skipped</UIText>
      
      {skipped.map((p) => (
        <View key={p.id}>
          <UIText>{p.name}</UIText>
        </View>
      ))}
    </When>
  </View>
}

const styles = StyleSheet.create({
  text: {
    fontStyle: 'italic',
    paddingHorizontal: 25,
    paddingVertical: 20,
    fontSize: FONTS.size.small
  },
  menu: {
    fontWeight: '700',
    paddingHorizontal: 25
  }
});
