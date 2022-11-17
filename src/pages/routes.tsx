import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChecklistPage from "./checklist.page";
import { useAuth } from '../context/auth.context';
import { Else, If, Then } from 'react-if';
import LoginPage from './auth/login.page';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { isConnected } = useAuth();
  
  return <NavigationContainer>
    <If condition={isConnected}>
      <Then>
        <Stack.Navigator>
          <Stack.Screen name="checklists" component={ChecklistPage} options={{ headerTitle: 'Checklists' }} />
        </Stack.Navigator>
      </Then>

      <Else>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginPage} options={{ header: () => <></> }} />
        </Stack.Navigator>
      </Else>
    </If>
  </NavigationContainer>
}
