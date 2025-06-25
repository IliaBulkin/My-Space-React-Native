import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function EmailIcon(props: SvgProps) {
  return (
    <Svg
    //   width={20}
    //   height={17}
      viewBox="0 0 20 17"
      // fill="#81818D"
    //   xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 2.5c0-1.1-.9-2-2-2H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12zm-2 0l-8 4.99L2 2.5h16zm0 12H2v-10l8 5 8-5v10z"
        fill="#81818D"
      />
    </Svg>
  )
}
