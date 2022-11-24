import moment from "moment";
import { useCallback, useState } from "react";
import { Case, Default, Else, If, Switch, Then, When } from "react-if";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AttentionSvg from "../../icon/attention-svg";
import CheckSvg from "../../icon/check-svg";
import MinusSvg from "../../icon/minus-svg";
import TaskSvg from "../../icon/task-svg";
import TimeSvg from "../../icon/time-svg";
import AlertModule from "../../module/alert/alert.module";
import { usePreDeparture } from "../../store";
import { PreDepartureType } from "../../types";
import COLORS from "../../ui/colors";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function PreDepartureItemCMP({ data }: { data: PreDepartureType }) {
  const updateStatus = usePreDeparture(state => state.updateStatus);
  const submitAttention = usePreDeparture(state => state.submitAttention);

  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = useCallback(() => { setShowModal(!showModal) }, [showModal]);
  
  const handleUncheck = useCallback(() => { updateStatus(data.id, 'pending'); }, [data, updateStatus]);
  const handleCompleted = useCallback(() => { updateStatus(data.id, 'completed'); }, [data, updateStatus]);
  const handleSkipped = useCallback(() => { updateStatus(data.id, 'skipped'); }, [data, updateStatus]);
  const handleSubmit = useCallback(() => { toggleModal() }, [toggleModal]);
  const onAlertDone = useCallback(() => {
    submitAttention(data.id);
    toggleModal();
  }, [data, submitAttention, toggleModal]);
  
  return <>
    <Swipeable renderRightActions={() => <When condition={data.attention_status !== 'pending'}>
      <View style={styles.buttonContainer}>
        <If condition={data.attention_required && data.attention_status === 'required'}>
          <Then>
            <TouchableOpacity style={styles.doneContainer} onPress={handleSubmit}><CheckSvg /><UIText style={styles.buttonText}>Submit</UIText></TouchableOpacity>
          </Then>
          <Else>
            <When condition={data.status === 'completed'}>
              <TouchableOpacity style={styles.doneContainer} onPress={handleUncheck}><CheckSvg /><UIText style={styles.buttonText}>Uncheck</UIText></TouchableOpacity>
            </When>
            <When condition={data.status === 'pending'}>
              <TouchableOpacity style={styles.doneContainer} onPress={handleCompleted}><CheckSvg /><UIText style={styles.buttonText}>Done</UIText></TouchableOpacity>
              <When condition={data.attention_status === 'optional'}>
                <TouchableOpacity style={styles.skipContainer} onPress={handleSkipped}><MinusSvg /><UIText style={styles.buttonText}>Skip</UIText></TouchableOpacity>
              </When>
            </When>
          </Else>
        </If>
      </View>
    </When>}>
      <View style={[styles.container, data.attention_required && data.attention_status === 'pending' && styles.containerPending]}>
        <View style={styles.icon}>
          <Switch>
            <Case condition={data.attention_required && data.attention_status === 'required'}>
              <AttentionSvg />
            </Case>
            <Case condition={data.attention_required && data.attention_status === 'pending'}>
              <TimeSvg />
            </Case>
            <Default>
              <TaskSvg />
            </Default>
          </Switch>
        </View>
        <View style={styles.content}>
          <View style={styles.firstContent}>
            <View>
              <UIText style={data.attention_required && data.attention_status === 'pending' && styles.textPending}>{data.name}</UIText>
              <UIText style={data.attention_required && data.attention_status === 'pending' && styles.textPending}>{data.nationality}</UIText>
            </View>
            <UIText style={styles.typeText}>{data.attention_status === 'optional' && '(Optional)'}</UIText>
          </View>

          <View style={styles.secondContent}>
            <UIText style={styles.issueDateText}>Issue date: {data.issue_date ? moment(data.issue_date).format('DD.MM.YYYY') : 'N/A'}</UIText>
            <UIText style={styles.expDateText}>Exp. date: {data.exp_date ? moment(data.exp_date).format('DD.MM.YYYY') : 'N/A'}</UIText>
          </View>
        </View>
      </View>
    </Swipeable>

    <AlertModule visible={showModal} onDone={onAlertDone} onClose={toggleModal} text="Have you informed your Manning Agency that this document is ready?" />
  </>
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
  containerPending: {
    opacity: 0.5,
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
  textPending: {
    color: COLORS.grey,
  }
});
