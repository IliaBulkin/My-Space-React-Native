import { ScrollView } from "react-native";
import { MainPage } from "../../modules/main-page/ui/main-page";


export default function Main() {
	return (
		<ScrollView style={{ backgroundColor: "#FAF8FF"}} overScrollMode="never">
			<MainPage></MainPage>
		</ScrollView>
	);
}
