import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function PasswordIcon(props: SvgProps) {
  return (
    <Svg
      // width={16}
      // height={22}
      viewBox="0 0 16 22"
      // fill="#81818D"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14 7.5h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H2c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-9-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H5v-2zm9 14H2v-10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
        fill="#81818D"
      />
    </Svg>
  )
}