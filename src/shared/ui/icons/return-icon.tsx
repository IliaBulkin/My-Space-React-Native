import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function ReturnIcon(props: SvgProps) {
  return (
    <Svg
    //   width={8}
    //   height={14}
      viewBox="0 0 8 14"
    //   fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.997 13.004a.992.992 0 01-1.402 0l-5.29-5.29a.992.992 0 010-1.402l5.29-5.29a.992.992 0 111.402 1.402l-4.59 4.589 4.59 4.589a.992.992 0 010 1.402z"
        fill="#81818D"
        fillOpacity={1}
      />
    </Svg>
  )
}