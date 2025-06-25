import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function LikeIcon(props: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M16.667 6.667H11.99l.936-2.806a1.673 1.673 0 00-.23-1.502 1.674 1.674 0 00-1.353-.692H10a.836.836 0 00-.64.3l-3.918 4.7H3.333c-.919 0-1.666.747-1.666 1.666v7.5c0 .92.747 1.667 1.666 1.667h11.09a1.676 1.676 0 001.56-1.082l2.298-6.125a.833.833 0 00.052-.293V8.333c0-.919-.747-1.666-1.666-1.666zM3.333 8.333H5v7.5H3.333v-7.5zM16.667 9.85l-2.245 5.984H6.667V7.802l3.723-4.469h.955l-1.302 3.903a.831.831 0 00.79 1.097h5.834V9.85z"
        fill="#81818D"
      />
    </Svg>
  )
}