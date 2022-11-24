import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { usePreDeparture } from "../../store";
import COLORS from "../../ui/colors";
import UIText from "../../ui/text/text";

export default function PreDepartureStatCMP() {
  const data = usePreDeparture(state => state.data);
  const percentage = useMemo(() => Math.round(data.filter((d) => d.status === 'completed').length * 100 / data.length), [data]);
  
  return <View style={styles.container}>
    <View style={styles.statTextContainer}><UIText style={styles.statText}>{percentage}% completed</UIText></View>
    <View style={styles.statContainer}>
      <View style={[{ width: `${percentage}%`}]}>
        <LinearGradient style={{ borderTopLeftRadius: 100, borderBottomLeftRadius: 100, height: 10  }} colors={[COLORS.marlowBlue, COLORS.marlowBlueLight, COLORS.green500]} angle={50} useAngle />
      </View>
      <View style={[styles.stat, styles.statEmpty, { width: `${100 - percentage}%` }]} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    backgroundColor: COLORS.white
  },
  statContainer: {
    flexDirection: 'row',
  },
  statTextContainer: {
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  statText: {},
  stat: {
    height: 10,
  },
  statFull: {
    backgroundColor: COLORS.navy300,
    borderWidth: 0.3,
    borderRightWidth: 0,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  statEmpty: {
    borderStyle: 'solid',
    borderWidth: 0.3,
    borderLeftWidth: 0,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
});
