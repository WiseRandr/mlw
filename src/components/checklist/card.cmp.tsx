import { PropsWithChildren } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../ui/colors";

export default function ChecklistCardCMP({ children, onPress = () => {} }: PropsWithChildren<{ onPress?: () => void }>) {
  return <TouchableOpacity onPress={onPress} style={styles.card}>{children}</TouchableOpacity>
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 15
  }
});
