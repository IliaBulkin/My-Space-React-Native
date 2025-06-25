import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function PhoneNumberIcon(props: SvgProps) {
  return (
    <Svg
    //   width={13}
    //   height={23}
      viewBox="0 0 13 23"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.5.5h-8A2.5 2.5 0 000 3v17a2.5 2.5 0 002.5 2.5h8A2.5 2.5 0 0013 20V3A2.5 2.5 0 0010.5.5zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S8 19.17 8 20s-.67 1.5-1.5 1.5zm4.5-4H2v-14h9v14z"
        fill="#fff"
      />
    </Svg>
  )
}

