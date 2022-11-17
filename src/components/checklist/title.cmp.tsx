import { StyleSheet, View } from "react-native";
import FONTS from "../../ui/fonts";
import UIText from "../../ui/text/text";

export default function ChecklistTitle({ title, description }: { title: string, description: string }) {
  return <View>
    <UIText style={styles.title}>{title}</UIText>
    <UIText style={styles.description}>{description}</UIText>
  </View>
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    marginBottom: 5
  },
  description: {
    fontSize: FONTS.size.medium,
    fontStyle: 'italic'
  }
});
