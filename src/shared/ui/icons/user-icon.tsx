import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function UserIcon(props: SvgProps) {
  return (
    <Svg
    //   width={18}
    //   height={19}
      viewBox="0 0 18 19"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16 2.5v14H2v-14h14zm0-2H2a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-7 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 10H3v-1.53c0-2.5 3.97-3.58 6-3.58s6 1.08 6 3.58v1.53zm-9.69-2h7.38c-.69-.56-2.38-1.12-3.69-1.12s-3.01.56-3.69 1.12z"
        fill="#fff"
      />
    </Svg>
  )
}
