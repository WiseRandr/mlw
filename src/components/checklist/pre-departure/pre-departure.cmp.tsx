import { useNavigation } from "@react-navigation/core";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import ChevronRightSvg from "../../../icon/chevron-right-svg";
import { usePreDeparture } from "../../../store";
import COLORS from "../../../ui/colors";
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
          <View>
            <CircularProgress
              radius={25}
              value={percentage}
              duration={1}
              activeStrokeColor={COLORS.marlowBlue}
              inActiveStrokeColor={COLORS.white}
              activeStrokeWidth={5}
              progressFormatter={(value: number) => {
                'worklet';
                return `${value}%`
              }}
            />
          </View>
          <UIText style={styles.text}>Review list</UIText>
          <View>
            <ChevronRightSvg />
          </View>
        </TouchableOpacity>
      </ChecklistCardCMP>
    </View>
  </View>
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
  statText: {
    fontWeight: '700',
  }
});
