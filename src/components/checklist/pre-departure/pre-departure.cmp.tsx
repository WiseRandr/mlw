import { View } from "react-native";
import UIText from "../../../ui/text/text";
import ChecklistCardCMP from "../card.cmp";
import ChecklistTitleCMP from "../title.cmp";

export default function PreDepartureCMP() {
  return <View>
    <ChecklistTitleCMP title="Pre-Departure Documents list" description="List of all required documents for your upcoming assignment" />

    <View>
      <ChecklistCardCMP>
        <UIText>Review list</UIText>
      </ChecklistCardCMP>
    </View>
  </View>
}
