import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function EyeCrossedIcon(props: SvgProps) {
  return (
    <Svg
      // width={20}
      // height={20}
      viewBox="0 0 20 20"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.114 8.233a2.5 2.5 0 103.533 3.534M8.822 4.233a8.692 8.692 0 011.059-.066c5.833 0 8.333 5.833 8.333 5.833-.372.797-.84 1.547-1.392 2.233M5.39 5.508A11.272 11.272 0 001.547 10s2.5 5.833 8.334 5.833a8.116 8.116 0 004.491-1.341M1.547 1.667l16.667 16.666"
        stroke="#81818D"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}
