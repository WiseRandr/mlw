import Svg, { G, Path, Rect } from "react-native-svg";

export default function AttentionSvg() {
  return <Svg width="24" height="24" viewBox="0 0 24 24">
    <G transform="translate(1123 8907)">
      <G transform="translate(-1123 -8907)">
        <Path d="M0,0H24V24H0Z" fill="none"/>
        <Path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" fill="#cb3c47"/>
      </G>
      <G transform="translate(-34 736)">
        <Rect width="2" height="6" transform="translate(-1078 -9636)" fill="#cb3c47"/>
        <Rect width="2" height="2" transform="translate(-1078 -9628)" fill="#cb3c47"/>
      </G>
    </G>
  </Svg>
}
