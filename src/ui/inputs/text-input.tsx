import { When } from "react-if";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CloseSvg from "../../icon/close-svg";
import COLORS from "../colors";
import FONTS from "../fonts";

export default function UITextInput({ label, placeholder, secure = false, value, onChangeText = () => {}, onClear = () => {} }: { value: string, label?: string, placeholder: string, secure?: boolean, onChangeText?: (t: string) => void, onClear?: () => void }) {
  return <View style={styles.container}>
    <When condition={label}><Text style={styles.label}>{label}</Text></When>
    <View>
      <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secure} value={value} onChangeText={onChangeText} />
      <When condition={value}>
        <TouchableOpacity style={styles.closeIcon} onPress={onClear}>
          <CloseSvg />
        </TouchableOpacity>
      </When>
    </View>
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
  closeIcon: {
    top: 25,
    right: 10,
    position: 'absolute',
  }
});
