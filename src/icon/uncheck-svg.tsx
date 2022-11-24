import Svg, { Circle, G, Path } from "react-native-svg";

export default function UnCheckSvg() {
  return <Svg width="24" height="24" viewBox="0 0 24 24">
    <G fill="none" stroke="#fff" strokeWidth="2">
      <Circle cx="12" cy="12" r="12" stroke="none"/>
      <Circle cx="12" cy="12" r="11" fill="none"/>
    </G>
  </Svg>;
}