import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

export function ImageWithStylesIcon(props: SvgProps) {
  return (
    <Svg
      width={41}
      height={40}
      viewBox="0 0 41 40"
      fill="none"
      {...props}
    >
      <Rect
        x={0.96875}
        y={0.5}
        width={39}
        height={39}
        rx={19.5}
        stroke="#543C52"
        strokeOpacity={1}
      />
      <Path
        d="M12.135 15a3.333 3.333 0 013.333-3.333h10A3.333 3.333 0 0128.801 15v10a3.333 3.333 0 01-3.333 3.333h-10A3.333 3.333 0 0112.135 25V15z"
        stroke="#543C52"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
      <Path
        d="M17.551 19.167a2.083 2.083 0 100-4.167 2.083 2.083 0 000 4.167zM22.573 20.518l-7.105 7.815h10.11a3.223 3.223 0 003.223-3.222V25c0-.39-.146-.538-.408-.826l-3.359-3.662a1.665 1.665 0 00-2.461.005z"
        stroke="#543C52"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}