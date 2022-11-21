import { PropsWithChildren } from "react";
import { Button, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import COLORS from "../colors";
import UIText from "../text/text";

export default function UIButton({ title, full = false, ...props }: PropsWithChildren<TouchableOpacityProps & { title: string, full?: boolean }>) {
  return <TouchableOpacity  style={[styles.button, full && styles.buttonFull]} {...props}><UIText style={[styles.buttonText, full && styles.buttonTextFull]}>{title}</UIText></TouchableOpacity>;
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: COLORS.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  buttonFull: {
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    color: COLORS.blue,
    fontWeight: '700'
  },
  buttonTextFull: {
    color: COLORS.white,
  }
});
