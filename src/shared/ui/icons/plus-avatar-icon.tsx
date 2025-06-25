import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

export function PlusAvatarIcon(props: SvgProps) {
  return (
    <Svg
      width={41}
      height={40}
      viewBox="0 0 41 40"
      
      fill="#543C52"
      {...props}
    >
      <Rect
        x={0.970215}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        stroke="#543C52"
        strokeOpacity={1}
      />
      <Path
        d="M26.96 21.08h-5.408v5.409a1.082 1.082 0 11-2.164 0V21.08H13.98a1.082 1.082 0 010-2.163h5.408v-5.409a1.082 1.082 0 012.164 0v5.409h5.408a1.082 1.082 0 110 2.163z"
        fill="#fff"
        fillOpacity={1}
      />
    </Svg>
  )
}
