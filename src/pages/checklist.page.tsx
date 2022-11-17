import { StyleSheet, Text, View } from "react-native";
import MyChecklistCMP from "../components/checklist/my-checklist/my-checklist.cmp";
import PreDepartureCMP from "../components/checklist/pre-departure/pre-departure.cmp";

export default function ChecklistPage() {
  return <View>
    <View style={styles.content}>
      <PreDepartureCMP />
    </View>
    <View style={styles.content}>
      <MyChecklistCMP />
    </View>
  </View>
}

const styles = StyleSheet.create({
  content: {
    padding: 16
  }
});
