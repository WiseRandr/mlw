import Svg, { Circle, G, Line } from "react-native-svg";

export default function MinusSvg() {
  return <Svg width="24" height="24" viewBox="0 0 24 24">
    <G transform="translate(-468 -11)">
      <G transform="translate(468 11)" fill="none" stroke="#fff" strokeWidth="2">
        <Circle cx="12" cy="12" r="12" stroke="none"/>
        <Circle cx="12" cy="12" r="11" fill="none"/>
      </G>
      <Line transform="translate(475.5 23.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" x2="9"/>
    </G>
  </Svg>
}
