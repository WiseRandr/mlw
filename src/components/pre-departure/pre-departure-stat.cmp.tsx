import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../../ui/colors";
import UIText from "../../ui/text/text";

export default function PreDepartureStatCMP() {
  const percentage = useMemo(() => 76, []);
  
  return <View style={styles.container}>
    <View style={styles.statTextContainer}><UIText style={styles.statText}>{percentage} completed</UIText></View>
    <View style={styles.statContainer}>
      <View style={[styles.stat, styles.statFull, { width: `${percentage}%` }]} />
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
