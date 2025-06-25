import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { useForm, Controller } from "react-hook-form";
import { IRegistration } from "../../types";
import { styles } from "./register-form.styles";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export function RegisterForm() {
	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Некоректна пошта")
			.required("Це поле обов'язкове")
			.min(3, "Довжина повинна бути 3 або більше")
			.max(64, "Довжина повинна бути менше або 32")
			.trim("Видаліть пробіли на початку і в кінці"),
		password: yup
			.string()
			.required("Це поле обов'язкове")
			.min(8, "Довжина повинна бути 8 або більше")
			.max(32, "Довжина повинна бути менше або 32")
			.trim("Видаліть пробіли на початку і в кінці")
			.test("uppercase", "Має бути хоча б одна велика літера", (v) =>
				/[A-Z]/.test(v || "")
			)
			.test("lowercase", "Має бути хоча б одна маленька літера", (v) =>
				/[a-z]/.test(v || "")
			)
			.test("digit", "Має бути хоча б одна цифра", (v) =>
				/\d/.test(v || "")
			)
			.test("special", "Має бути хоча б один спеціальний символ", (v) =>
				/[!@#$%^&*(),.?":{}|<>]/.test(v || "")
			),
		confirmPassword: yup
			.string()
			.required("Це поле обов'язкове")
			.oneOf([yup.ref("password")], "Паролі не співпадають"),
	});

	const { replace } = useRouter();
	const { register } = useAuthContext();
	const [globalError, setGlobalError] = useState<string>("");

	const { handleSubmit, control, formState, setValue, setError } =
		useForm<IRegistration>({
			defaultValues: {
				email: "",
				password: "",
			},
			resolver: yupResolver(schema),
		});
	function onSubmit(data: IRegistration) {
		async function request() {
			const response = await register(data.email, data.password);
			if (typeof response === "string") {
				setGlobalError(response);
			} else {
				response.forEach((obj) => {
					setError(obj.path as keyof IRegistration, {
						message: obj.message,
					});
				});
			}
		}
		request();
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.registerForm}>
				<View style={styles.form}>
					<View style={styles.loginRegisterNav}>
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
								Реєстрація
							</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => replace("/login")}>
							<Text
								style={{
									fontWeight: 500,
									color: "#81818D",
									fontSize: 24,
								}}
							>
								Авторизація
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={styles.greetingText}>
						Приєднуйся до World IT
					</Text>
					<View>
						<Text style={styles.inputText}>Електрона пошта</Text>
						<Controller
							control={control}
							name="email"
							render={({ field, fieldState }) => {
								return (
									<Input
										// iconLeft={
										// 	<ICONS.EmailIcon
										// 		width={30}
										// 		height={30}
										// 	/>
										// }
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
					<View>
						<Text style={styles.inputText}>Повторіть пароль</Text>
						<Controller
							control={control}
							name="confirmPassword"
							render={({ field, fieldState }) => {
								return (
									<Input.Password
										showLeftIcon={false}
										placeholder="Повтори пароль"
										onChange={field.onChange}
										onChangeText={field.onChange}
										value={field.value}
										autoCorrect={false}
										errorMessage={fieldState.error?.message}
									/>
								);
							}}
						/>
					</View>

					{!(globalError === "") && (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<ICONS.ErrorIcon width={30} height={30} />
							<Text style={{ display: "flex", color: "red" }}>
								{globalError}
							</Text>
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
