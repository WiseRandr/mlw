import Svg, { Circle, Path } from "react-native-svg";

export default function TaskSvg() {
  return <Svg width="20" height="20" viewBox="0 0 20 20">
    <Circle cx="10" cy="10" r="10" fill="#005aa5"/>
    <Path d="M9,2H5a1,1,0,0,0-.995,1L4,11a1,1,0,0,0,.995,1H11a1,1,0,0,0,1-1V5Zm1,8H6V9h4Zm0-2H6V7h4ZM8.5,5.5V2.75L11.25,5.5Z" transform="translate(2 3)" fill="#eceef0"/>
  </Svg>
}