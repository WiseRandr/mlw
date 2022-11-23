import moment from "moment";
import { StyleSheet, View } from "react-native";
import TaskSvg from "../../icon/task-svg";
import { PreDepartureType } from "../../types";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function PreDepartureItemCMP({ data }: { data: PreDepartureType }) {
  return <View style={styles.container}>
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
});
