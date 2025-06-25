import {
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { Input } from "../../../../shared/ui/input";
import { ICONS } from "../../../../shared/ui/icons";
import { IEmailCode } from "../../types";
import { Controller, useForm } from "react-hook-form";
import { styles } from "./register-email-form.styles";
import { useAuthContext } from "../../context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS } from "../../../../shared/constants";

export function RegisterEmailForm() {
	const params = useLocalSearchParams<{ email: string; password: string }>();
	const router = useRouter();
	const schema = yup.object().shape({
		code: yup.string().required("Це поле обов'язкове"),
	});

	const { handleSubmit, control, setValue, setError } = useForm<IEmailCode>({
		resolver: yupResolver(schema),
		defaultValues: {
			code: "",
		},
	});

	const [globalError, setGlobalError] = useState<string>("");
	const { registerEmail } = useAuthContext();

	function onSubmit(data: IEmailCode) {
		async function request() {
			const response = await registerEmail(
				params.email,
				params.password,
				Number(data.code)
			);
			if (typeof response === "string") {
				setGlobalError(response);
			}
		}
		request();
	}

	return (
		<TouchableWithoutFeedback>
			<View style={styles.container}>
				<View style={styles.form}>
					<Text
						style={{
							fontSize: 24,
							textAlign: "center",
							color: "#070A1C",
							fontFamily: "GTWalsheimPro-Regular",
						}}
					>
						Підтвердження пошти
					</Text>
					<View style={styles.textEmailContainer}>
						<Text
							style={{
								fontSize: 14,
								textAlign: "center",
								color: "#070A1C",
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Ми надіслали 6-значний код на вашу пошту (
							{params.email}). Введіть його нижче, щоб підтвердити
							акаунт
						</Text>
					</View>

					<Controller
						control={control}
						name="code"
						render={({ field, fieldState }) => (
							<Input.Code
								label="Код підтвердження"
								errorMessage={fieldState.error?.message}
								onChangeText={field.onChange}
							/>
						)}
					/>

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
					<View style={styles.buttonsBlock}>
						<TouchableOpacity onPress={handleSubmit(onSubmit)}>
							<View style={styles.buttonRegister}>
								<Text
									style={{
										color: COLORS.WHITE,
										fontFamily: "GTWalsheimPro-Regular",
										fontSize: 16,
									}}
								>
									Підтвердити
								</Text>
							</View>
						</TouchableOpacity>

						<View>
							<TouchableOpacity
								onPress={() => {
									router.replace("/register");
								}}
							>
								<Text
									style={{
										color: COLORS.BLACK,
										fontFamily: "GTWalsheimPro-Regular",
									}}
								>
									Назад
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}
