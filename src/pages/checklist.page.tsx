import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CreateMyChecklistCMP from "../components/checklist/my-checklist/create-my-checklist.cmp";
import MyChecklistCMP from "../components/checklist/my-checklist/my-checklist.cmp";
import PreDepartureCMP from "../components/checklist/pre-departure/pre-departure.cmp";
import AddSvg from "../icon/add-svg";

export default function ChecklistPage() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = useCallback(() => { setShowModal(!showModal) }, [showModal]);

  return <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <PreDepartureCMP />
    </View>
    <View style={styles.content}>
      <MyChecklistCMP />
    </View>
    <View style={styles.addIcon}>
      <TouchableOpacity onPress={toggleModal}>
        <AddSvg />
      </TouchableOpacity>
    </View>
    <CreateMyChecklistCMP visible={showModal} close={toggleModal} />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  },
  addIcon: {
    position: 'absolute',
    bottom: 28,
    right: 16,
  },
});
