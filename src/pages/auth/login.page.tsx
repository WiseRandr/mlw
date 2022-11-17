import { SafeAreaView, StyleSheet, View } from "react-native";
import { useAuth } from "../../context/auth.context";
import UIButton from "../../ui/button/button";
import UITextInput from "../../ui/inputs/text-input";

export default function LoginPage() {
  const { login } = useAuth();
  
  return <SafeAreaView style={styles.wrapper}>
    <View style={styles.container}>
      <View>
        <UITextInput placeholder="username" label="Username" value="TmpUser" />
        <UITextInput placeholder="password" label="Password" secure value="TmpPassword" />
        <UIButton onPress={login} title="Login" />
      </View>
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center'
  }
});
