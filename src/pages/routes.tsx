import HomePage from "./home-page";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChecklistPage from "./checklist-page";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomePage} options={{ headerTitle: 'Home' }} />
      <Stack.Screen name="checklists" component={ChecklistPage} options={{ headerTitle: 'Checklists' }} />
    </Stack.Navigator>
  </NavigationContainer>
}
