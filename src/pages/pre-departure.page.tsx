import { useNavigation } from "@react-navigation/core";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import PreDepartureStatCMP from "../components/pre-departure/pre-departure-stat.cmp";
import PreDepartureTabCMP from "../components/pre-departure/pre-departure-tab.cmp";
import ChevronLeftSvg from "../icon/chevron-left-svg";

export default function PreDeparturePage() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}><ChevronLeftSvg /></TouchableOpacity>),
    })
  }, []);
  
  return <View>
    <PreDepartureStatCMP />
    <PreDepartureTabCMP />
  </View>;
}
