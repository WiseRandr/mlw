import { StyleSheet, Text, TextInput, View } from "react-native";

export default function UITextInput({ label, placeholder, secure = false, value }: { value: string, label: string, placeholder: string, secure?: boolean }) {
  return <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secure} value={value} />
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
    padding: 8,
    borderRadius: 8,
  },
});
