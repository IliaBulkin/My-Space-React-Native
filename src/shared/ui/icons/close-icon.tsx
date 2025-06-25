import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function CloseIcon(props: SvgProps) {
  return (
    <Svg
    //   width={13}
    //   height={12}
      viewBox="0 0 13 12"
    //   fill="none"
      {...props}
    >
      <Path
        d="M10.293 11.353L6.47 7.528l-3.825 3.825a1.082 1.082 0 01-1.53-1.53L4.94 5.998 1.114 2.174a1.082 1.082 0 011.53-1.53L6.47 4.47 10.293.644a1.082 1.082 0 011.53 1.53L7.999 5.998l3.824 3.825a1.082 1.082 0 11-1.53 1.53z"
        fill={props.color}
        fillOpacity={1}
      />
    </Svg>
  )
}
