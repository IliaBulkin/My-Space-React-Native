import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export function UncheckedCheckbox(props: SvgProps) {
	return (
		<Svg viewBox="0 0 18 18" {...props} fill="none">
			<Path
				d="M14.959 1.5H3.709c-1.036 0-1.875.84-1.875 1.875v11.25c0 1.036.84 1.875 1.875 1.875h11.25c1.036 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875z"
				stroke="#543C52"
			/>
		</Svg>
	);
}
