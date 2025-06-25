import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function ChatIcon(props: SvgProps) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M1.455 9a7.515 7.515 0 1115.03 0v4.782c0 .796 0 1.193-.118 1.511a1.878 1.878 0 01-1.104 1.104c-.318.118-.716.118-1.511.118H8.97A7.515 7.515 0 011.455 9z"
        stroke="#070A1C"
        strokeWidth={1.66667}
        strokeOpacity={1}
      />
      <Path
        d="M6.152 8.06h5.636M8.97 11.819h2.818"
        stroke="#070A1C"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}