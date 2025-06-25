import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function PlusWithoutBorder(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M14.49 9.08H9.082v5.409a1.082 1.082 0 11-2.164 0V9.08H1.51a1.082 1.082 0 010-2.163h5.41V1.508a1.082 1.082 0 012.163 0v5.409h5.408a1.082 1.082 0 010 2.163z"
        fill="#543C52"
        fillOpacity={1}
      />
    </Svg>
  )
}

