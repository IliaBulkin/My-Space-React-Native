import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function PressedLikeIcon(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M3.333 17.5h.834V6.667h-.834a1.667 1.667 0 00-1.666 1.666v7.5A1.667 1.667 0 003.333 17.5zM16.667 6.667h-5.834l.935-2.807a1.668 1.668 0 00-1.58-2.193H10L5.833 6.198V17.5H15l3.26-7.163.073-.337V8.333a1.667 1.667 0 00-1.666-1.666z"
        fill="#81818D"
      />
    </Svg>
  )
}