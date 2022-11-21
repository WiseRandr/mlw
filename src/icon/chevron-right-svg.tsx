import Svg, { Path } from "react-native-svg";
import COLORS from "../ui/colors";

export default function ChevronRightSvg({ width = 26, height = 26, color = COLORS.black }) {
  return <Svg enable-background="new 0 0 32 32"  viewBox="0 0 32 32" width={width} height={height}>
    <Path clip-rule="evenodd" d="M21.698,15.286l-9.002-8.999  c-0.395-0.394-1.035-0.394-1.431,0c-0.395,0.394-0.395,1.034,0,1.428L19.553,16l-8.287,8.285c-0.395,0.394-0.395,1.034,0,1.429  c0.395,0.394,1.036,0.394,1.431,0l9.002-8.999C22.088,16.325,22.088,15.675,21.698,15.286z" fill={color} fill-rule="evenodd"/>
  </Svg>
}
