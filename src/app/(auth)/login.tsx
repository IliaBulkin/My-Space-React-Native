import { LoginForm } from "../../modules/auth/ui";
import { View } from "react-native";

export default function Login() {
	return (
		<View style={{flex: 1}}>
			<LoginForm />			
		</View>
	);
}