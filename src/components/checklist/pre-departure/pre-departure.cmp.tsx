import { useNavigation } from "@react-navigation/core";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { usePreDeparture } from "../../../store";
import UIText from "../../../ui/text/text";
import ChecklistCardCMP from "../card.cmp";
import ChecklistTitleCMP from "../title.cmp";

export default function PreDepartureCMP() {
  const navigation = useNavigation();
  const handlePress = useCallback(() => {
    navigation.navigate('pre-departure' as never)
  }, []);
  const data = usePreDeparture(state => state.data);
  const percentage = useMemo(() => Math.round(data.filter((d) => d.status === 'completed').length * 100 / data.length), [data]);
  
  return <View>
    <ChecklistTitleCMP title="Pre-Departure Documents list" description="List of all required documents for your upcoming assignment" />

    <View>
      <ChecklistCardCMP>
        <TouchableOpacity onPress={handlePress} style={styles.list}>
          <UIText>Review list</UIText>
        </TouchableOpacity>
      </ChecklistCardCMP>
    </View>
  </View>
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
