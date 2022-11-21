import { useNavigation, useRoute } from "@react-navigation/core";
import { useCallback, useEffect, useMemo } from "react";
import { When } from "react-if";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ChevronLeftSvg from "../icon/chevron-left-svg";
import { useMyChecklist } from "../store";
import UIButton from "../ui/button/button";
import FONTS from "../ui/fonts";
import UIText from "../ui/text/text";

export default function MyChecklistDetailPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = useMemo(() => (route.params as any)?.id || '', [route]);
  const myChecklists = useMyChecklist(state => state.myChecklist);
  const current = useMemo(() => myChecklists.find((c) => c.id === id), [id]);

  const goBack = useCallback(() => { navigation.goBack() }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (<TouchableOpacity onPress={goBack} style={styles.headerLeft}><ChevronLeftSvg /><UIText>Lists</UIText></TouchableOpacity>),
      headerRight: () => (<UIButton title="Edit List" />)
    });
  }, []);

  return <View>
    <When condition={Boolean(current)}>
      <UIText style={styles.title}>{current?.name}</UIText>
    </When>
  </View>
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    fontWeight: '700',
    fontSize: FONTS.size.large
  }
});
