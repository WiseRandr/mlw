import { View } from "react-native";
import PreDepartureStatCMP from "../components/pre-departure/pre-departure-stat.cmp";
import { useMemo, useState } from "react";
import PreDepartureTabCMP from "../components/pre-departure/pre-departure-tab.cmp";

export default function PreDeparturePage() {
  const [index, setIndex] = useState(0);
  const routes = useMemo(() => ([{ key: 'first', title: 'First' }, { key: 'second', title: 'Second' }]), []);

  return <View>
    <PreDepartureStatCMP />

    <PreDepartureTabCMP />
  </View>;
}
