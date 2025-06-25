import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function SendPostIcon(props: SvgProps) {
	return (
		<Svg
			// width={17}
			// height={20}
			viewBox="0 0 17 20"
			// fill="none"
			{...props}
		>
			<Path
				d="M15.8 8.63L2.67 1.138A1.562 1.562 0 00.43 3.018L2.79 9.999.431 16.98a1.563 1.563 0 002.24 1.88l.006-.005 13.125-7.505a1.563 1.563 0 000-2.72H15.8zM2.465 16.816l1.986-5.88h4.327a.938.938 0 000-1.875H4.452l-1.987-5.88 11.934 6.81-11.933 6.825z"
				fill="#fff"
				fillOpacity={1}
			/>
		</Svg>
	);
}