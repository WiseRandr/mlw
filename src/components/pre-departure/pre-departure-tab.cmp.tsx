import PreDepartureStcwNationalCMP from './pre-departure-stcw-national.cmp';
import PreDepartureFlagStateCMP from './pre-departure-flag-state.cmp';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import UIText from '../../ui/text/text';
import { useCallback, useMemo, useState } from 'react';
import COLORS from '../../ui/colors';
import { Case, Switch, When } from 'react-if';
import { usePreDeparture } from '../../store';
import AttentionSvg from '../../icon/attention-svg';

export default function PreDepartureTabCMP() {
  const [index, setIndex] = useState<number>(0);
  const data = usePreDeparture(state => state.data);
  const menus = useMemo(() => [
    { index: 0, name: 'STCW National', key: 'stcw-national' },
    { index: 1, name: 'Flag State', key: 'flag-state' },
    { index: 2, name: 'GDPR Documents', key: 'gdpr-documents' },
    { index: 3, name: 'Training', key: 'training' },
    { index: 4, name: 'Technical', key: 'technical' },
  ], []);

  const handleSwitch = useCallback((newIndex: number) => () => { setIndex(newIndex) }, []);
  
  return <View>
    <View style={styles.container}>
      <ScrollView horizontal style={styles.menuContainer} showsHorizontalScrollIndicator={false}>
        {menus.map((menu) => (
          <View key={menu.index} style={styles.menu}>
            <TouchableOpacity style={[styles.menuInner, index === menu.index && styles.menuSelected]} onPress={handleSwitch(menu.index)}>
              <When condition={data.filter((d) => d.category === menu.key && d.attention_status === 'required').length > 0}><View style={styles.menuIcon}><AttentionSvg /></View></When>
              <UIText style={[styles.menuText, index === menu.index && styles.menuTextSelected]}>{menu.name}</UIText>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>

    <Switch>
      <Case condition={index === 0}><PreDepartureStcwNationalCMP /></Case>
      <Case condition={index === 1}><PreDepartureFlagStateCMP /></Case>
    </Switch>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  menuContainer: {},
  menu: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  menuIcon: {
    marginRight: 5,
  },
  menuInner: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuSelected: {
    borderBottomWidth: 2,
    borderColor: COLORS.marlowBlue,
  },
  menuText: {
    fontWeight: '600',
    color: COLORS.navy500,
  },
  menuTextSelected: {
    color: COLORS.marlowBlue,
  },
});
