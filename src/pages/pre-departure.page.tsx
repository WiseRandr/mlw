import { View } from "react-native";
import PreDepartureStatCMP from "../components/pre-departure/pre-departure-stat.cmp";
import PreDepartureTabCMP from "../components/pre-departure/pre-departure-tab.cmp";

export default function PreDeparturePage() {
  return <View>
    <PreDepartureStatCMP />
    <PreDepartureTabCMP />
  </View>;
}
