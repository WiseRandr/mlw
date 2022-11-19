import { When } from "react-if";
import { StyleSheet, Text, TextInput, View } from "react-native";
import COLORS from "../colors";
import FONTS from "../fonts";

export default function UITextInput({ label, placeholder, secure = false, value, onChangeText = () => {} }: { value: string, label?: string, placeholder: string, secure?: boolean, onChangeText?: (t: string) => void }) {
  return <View style={styles.container}>
    <When condition={label}><Text style={styles.label}>{label}</Text></When>
    <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secure} value={value} onChangeText={onChangeText} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  label: {
    fontWeight: "700",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
    fontSize: FONTS.size.normal,
    backgroundColor: COLORS.white
  },
});
