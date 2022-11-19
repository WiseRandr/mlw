import { useNavigation } from "@react-navigation/core";
import { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MyChecklistCMP from "../components/checklist/my-checklist/my-checklist.cmp";
import PreDepartureCMP from "../components/checklist/pre-departure/pre-departure.cmp";
import AddSvg from "../icon/add-svg";

export default function ChecklistPage() {
  const navigation = useNavigation();
  const openModal = useCallback(() => { navigation.navigate('create-my-checklist-modal' as never) }, [navigation]);

  return <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <PreDepartureCMP />
    </View>
    <View style={styles.content}>
      <MyChecklistCMP />
    </View>
    <View style={styles.addIcon}>
      <TouchableOpacity onPress={openModal}>
        <AddSvg />
      </TouchableOpacity>
    </View>
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
