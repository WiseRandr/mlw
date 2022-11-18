import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../../ui/colors";

export default function ChecklistCardCMP({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    height: 80,
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 15
  }
});
