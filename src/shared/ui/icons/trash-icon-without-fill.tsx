import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function TrashCanIconWithoutFill(props: SvgProps) {
  return (
    <Svg
    //   width={16}
    //   height={18}
      viewBox="0 0 16 18"
      // fill="none"
      {...props}
    >
      <Path
        d="M.893 4.833h13.333M5.893 8.167v5m3.333-5v5m-7.5-8.334l.833 10A1.666 1.666 0 004.226 16.5h6.667a1.667 1.667 0 001.666-1.667l.834-10m-8.334 0v-2.5a.833.833 0 01.834-.833h3.333a.833.833 0 01.833.833v2.5"
        stroke="#543C52"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}

