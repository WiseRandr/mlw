import moment from "moment";
import { useCallback } from "react";
import { When } from "react-if";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import CheckSvg from "../../icon/check-svg";
import MinusSvg from "../../icon/minus-svg";
import TaskSvg from "../../icon/task-svg";
import { usePreDeparture } from "../../store";
import { PreDepartureType } from "../../types";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function PreDepartureItemCMP({ data }: { data: PreDepartureType }) {
  const updateStatus = usePreDeparture(state => state.updateStatus);

  const handleUncheck = useCallback(() => { updateStatus(data.id, 'pending'); }, [data, updateStatus]);
  const handleCompleted = useCallback(() => { updateStatus(data.id, 'completed'); }, [data, updateStatus]);
  const handleSkipped = useCallback(() => { updateStatus(data.id, 'skipped'); }, [data, updateStatus]);
  
  return <Swipeable renderRightActions={() => <View style={styles.buttonContainer}>
    <When condition={data.status === 'completed'}>
      <TouchableOpacity style={styles.doneContainer} onPress={handleUncheck}><CheckSvg /><UIText style={styles.buttonText}>Uncheck</UIText></TouchableOpacity>
    </When>
    <When condition={data.status !== 'completed'}>
      <TouchableOpacity style={styles.doneContainer} onPress={handleCompleted}><CheckSvg /><UIText style={styles.buttonText}>Done</UIText></TouchableOpacity>
    </When>
    <When condition={data.optional && data.status !== 'completed'}>
      <TouchableOpacity style={styles.skipContainer} onPress={handleSkipped}><MinusSvg /><UIText style={styles.buttonText}>Skip</UIText></TouchableOpacity>
    </When>
  </View>}>
    <View style={styles.container}>
      <View style={styles.icon}><TaskSvg /></View>
      <View style={styles.content}>
        <View style={styles.firstContent}>
          <View>
            <UIText>{data.name}</UIText>
            <UIText>{data.nationality}</UIText>
          </View>
          <UIText style={styles.typeText}>{data.optional && '(Optional)'}</UIText>
        </View>

        <View style={styles.secondContent}>
          <UIText style={styles.issueDateText}>Issue date: {moment(data.issue_date).format('DD.MM.YYYY')}</UIText>
          <UIText style={styles.expDateText}>Exp. date: {moment(data.exp_date).format('DD.MM.YYYY')}</UIText>
        </View>
      </View>
    </View>
  </Swipeable>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  icon: {
    marginRight: 17,
  },
  content: {
    flex: 1,
  },
  issueDateText: {
    color: COLORS.grey,
    fontSize: FONTS.size.small,
  },
  typeText: {
    textAlign: 'right',
    color: COLORS.grey,
    fontSize: FONTS.size.small,
  },
  expDateText: {
    color: COLORS.grey,
    fontSize: FONTS.size.small,
  },
  firstContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    marginTop: 10,
    color: COLORS.white,
  },
  doneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.green600,
  },
  skipContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.navy800,
  },
});
