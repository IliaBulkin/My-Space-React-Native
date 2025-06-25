import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function EyeIconWithoutFill(props: SvgProps) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <Path
        d="M2.225 10s2.5-5.833 8.333-5.833S18.89 10 18.89 10s-2.5 5.833-8.333 5.833S2.225 10 2.225 10z"
        stroke="#543C52"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
      <Path
        d="M10.558 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}

