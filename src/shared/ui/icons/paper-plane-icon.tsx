import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function PaperPlaneIcon(props: SvgProps) {
	return (
		<Svg
			// width={17}
			// height={20}
			viewBox="0 0 17 20"
			// fill="none"
			{...props}
		>
			<Path
				d="M16.211 8.63L3.081 1.138a1.562 1.562 0 00-2.238 1.88l2.358 6.981L.843 16.98a1.563 1.563 0 002.24 1.88l.006-.005 13.125-7.505a1.561 1.561 0 000-2.72h-.003zM2.877 16.816l1.986-5.88h4.328a.938.938 0 000-1.875H4.863l-1.986-5.88L14.81 9.99 2.877 16.815z"
				fill="#fff"
				fillOpacity={1}
			/>
		</Svg>
	);
}
