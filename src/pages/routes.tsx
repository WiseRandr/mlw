import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChecklistPage from "./checklist.page";
import { useAuth } from '../context/auth.context';
import { Else, If, Then } from 'react-if';
import LoginPage from './auth/login.page';
import COLORS from '../ui/colors';
import PreDeparturePage from './pre-departure.page';
import CreateChecklistPage from './create-checklist.page';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { isConnected } = useAuth();
  
  return <NavigationContainer>
    <If condition={isConnected}>
      <Then>
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: COLORS.navy300 } }}>
          <Stack.Screen name="checklists" component={ChecklistPage} options={{ headerTitle: 'Checklists', headerShadowVisible: false, headerStyle: { backgroundColor: COLORS.navy300 } }} />
          <Stack.Screen name="pre-departure" component={PreDeparturePage} options={{ headerTitle: 'Pre-Departure Documents List', headerShadowVisible: false }} />

          <Stack.Group screenOptions={{ presentation: 'modal', header: () => <></> }}>
            <Stack.Screen name="create-my-checklist-modal" component={CreateChecklistPage} />
          </Stack.Group>
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
