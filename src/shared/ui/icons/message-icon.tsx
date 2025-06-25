import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function MessageIcon(props: SvgProps) {
  return (
    <Svg
    //   width={18}
    //   height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M1.148 9a7.515 7.515 0 1115.03 0v4.782c0 .796 0 1.193-.118 1.511a1.879 1.879 0 01-1.103 1.104c-.319.118-.716.118-1.512.118H8.664A7.515 7.515 0 011.148 9z"
        stroke="#070A1C"
        strokeWidth={1.66667}
        strokeOpacity={1}
      />
      <Path
        d="M5.846 8.06h5.636m-2.818 3.758h2.818"
        stroke="#070A1C"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={1}
      />
    </Svg>
  )
}