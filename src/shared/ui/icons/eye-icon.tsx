import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function EyeIcon(props: SvgProps) {
  return (
    <Svg
      // width={20}
      // height={14}
      viewBox="0 0 20 14"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.547 7s2.5-5.833 8.334-5.833C15.714 1.167 18.214 7 18.214 7s-2.5 5.833-8.333 5.833C4.047 12.833 1.547 7 1.547 7z"
        stroke="#81818D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
      <Path
        d="M9.88 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="#81818D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}