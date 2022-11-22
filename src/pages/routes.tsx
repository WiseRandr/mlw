import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChecklistPage from "./checklist.page";
import { useAuth } from '../context/auth.context';
import { Else, If, Then } from 'react-if';
import LoginPage from './auth/login.page';
import COLORS from '../ui/colors';
import PreDeparturePage from './pre-departure.page';
import CreateChecklistModalPage from './create-checklist.modal.page';
import PreCreateChecklistPage from './pre-create-checklist.page';
import MyChecklistDetailPage from './my-checklist-detail.page';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { isConnected } = useAuth();
  
  return <NavigationContainer>
    <If condition={isConnected}>
      <Then>
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: COLORS.navy300 } }}>
          <Stack.Screen name="checklists" component={ChecklistPage} options={{ headerTitle: 'Checklists', headerShadowVisible: false, headerStyle: { backgroundColor: COLORS.navy300 } }} />
          <Stack.Screen name="pre-departure" component={PreDeparturePage} options={{ headerTitle: 'Pre-Departure Documents List', headerShadowVisible: false }} />
          <Stack.Screen name="pre-create-checklist" component={PreCreateChecklistPage} options={{ headerTitle: '', headerShadowVisible: false }} />
          <Stack.Screen name="my-checklist-detail" component={MyChecklistDetailPage} options={{ headerTitle: '', headerShadowVisible: false, headerStyle: { backgroundColor: COLORS.navy300 } }} />

          <Stack.Group screenOptions={{ presentation: 'modal', header: () => <></> }}>
            <Stack.Screen name="create-my-checklist-modal" component={CreateChecklistModalPage} />
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
