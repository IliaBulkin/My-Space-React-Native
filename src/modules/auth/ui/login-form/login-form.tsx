import {
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { ILogin } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./login-form.styles";
import { useAuthContext } from "../../context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "expo-router";
import { HOST, PORT } from "../../../../shared/base-url";

export function LoginForm() {
	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Некоректна пошта")
			.required("Це поле обов'язкове")
			.trim("Видаліть пробіли на початку і в кінці"),
		password: yup
			.string()
			.required("Це поле обов'язкове")
			.trim("Видаліть пробіли на початку і в кінці"),
	});

	const { handleSubmit, control, setValue, setError } = useForm<ILogin>({
		defaultValues: { email: "", password: "" },
		resolver: yupResolver(schema),
	});

	const [globalError, setGlobalError] = useState<string>("");
	const { login } = useAuthContext();
	const { replace } = useRouter();

	function onSubmit(data: ILogin) {
		async function request() {
			const response = await login(data.email, data.password);
			setValue("email", "");
			setValue("password", "");

			if (typeof response === "string") {
				setGlobalError(response);
			} else {
				response.forEach((obj) => {
					setError(obj.path as keyof ILogin, {
						message: obj.message,
					});
				});
			}
		}
		request();
	}

	return (
		<TouchableWithoutFeedback>
			<View style={styles.loginForm}>
				<View style={styles.form}>
					<View style={styles.loginRegisterNav}>
						<TouchableOpacity onPress={() => replace("/register")}>
							<Text
								style={{
									fontWeight: 500,
									color: "#81818D",
									fontSize: 24,
								}}
							>
								Реєстрація
							</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text
								style={{
									fontWeight: 700,
									color: "#070A1C",
									fontSize: 24,
									borderBottomColor: "#543C52",
									borderBottomWidth: 2,
								}}
							>
								Авторизація
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.greetingText}>
						Раді тебе знову бачити!
					</Text>
					<View>
						<Text style={styles.inputText}>Електрона пошта</Text>
						<Controller
							control={control}
							name="email"
							render={({ field, fieldState }) => {
								return (
									<Input
										placeholder="you@example.com"
										onChange={field.onChange}
										onChangeText={field.onChange}
										value={field.value}
										autoCorrect={false}
										errorMessage={fieldState.error?.message}
										height={42}
									/>
								);
							}}
						/>
					</View>

					<View>
						<Text style={styles.inputText}>Пароль</Text>
						<Controller
							control={control}
							name="password"
							render={({ field, fieldState }) => {
								return (
									<Input.Password
										showLeftIcon={false}
										placeholder="Введи пароль"
										onChange={field.onChange}
										onChangeText={field.onChange}
										value={field.value}
										autoCorrect={false}
										errorMessage={fieldState.error?.message}
										height={42}
									/>
								);
							}}
						/>
					</View>

					{!(globalError === "") && (
						<View>
							<ICONS.ErrorIcon width={30} height={30} />
							<Text>{globalError}</Text>
						</View>
					)}
					<TouchableOpacity
						onPress={handleSubmit(onSubmit)}
						style={styles.submitButt}
					>
						<Text style={{ color: "#FFFFFF" }}>Увійти</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
