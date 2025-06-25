import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export function PencilIcon(props: SvgProps) {
  return (
    <Svg
    //   width={16}
    //   height={16}
      viewBox="0 0 16 16"
    //   fill="none"
      {...props}
    >
      <Path
        d="M2.167 13.833h1.187L11.5 5.687 10.312 4.5l-8.145 8.146v1.187zM.5 15.5v-3.542L11.5.98c.167-.153.35-.27.553-.354.201-.083.413-.125.634-.125.222 0 .437.042.646.125.21.083.39.208.542.375l1.146 1.167c.166.152.288.333.365.541a1.783 1.783 0 010 1.261 1.542 1.542 0 01-.365.552L4.04 15.5H.5zM10.896 5.104l-.584-.604L11.5 5.688l-.604-.584z"
        fill="#070A1C"
        fillOpacity={1}
      />
    </Svg>
  )
}