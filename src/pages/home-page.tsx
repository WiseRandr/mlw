import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomePage() {
  const navigation = useNavigation();
  
  return <View>
    <Text>Home page</Text>
    <TouchableOpacity onPress={() => { navigation.navigate('checklists' as never) }}>
      <Text>Go to checklist</Text>
    </TouchableOpacity>
  </View>
}
