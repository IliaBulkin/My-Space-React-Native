import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function TrashCanIcon(props: SvgProps) {
  return (
    <Svg
    //   width={16}
    //   height={18}
      viewBox="0 0 16 18"
      fill="none"
      {...props}
    >
      <Path
        d="M1.333 4.833h13.334M6.333 8.167v5m3.334-5v5m-7.5-8.334l.833 10A1.666 1.666 0 004.667 16.5h6.666A1.667 1.667 0 0013 14.833l.833-10m-8.333 0v-2.5a.833.833 0 01.833-.833h3.334a.833.833 0 01.833.833v2.5"
        stroke={"#543C52"}
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}