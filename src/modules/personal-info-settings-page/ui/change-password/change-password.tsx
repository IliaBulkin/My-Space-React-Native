import { View, Image, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { IChangePasswordForm, IAvatarProps } from "./change-password.types";
import { styles } from "./change-password.styles";
import { pickImage } from "../../../../shared/tools";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../auth/context";
import { Response } from "../../../../shared/types";
import { ProfileCard } from "../../../../shared/ui/profileCard";
import { ButtonEdit } from "../buttonEdit";
import { Controller, useForm } from "react-hook-form";
import { HOST, PORT } from "../../../../shared/base-url";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export function ChangePassword() {
	const [avatar, setAvatar] = useState<string>("");

	const { token } = useAuthContext();

	const [passwordIsHidden, setPasswordIsHidden] = useState<boolean>(true);
	const [repeatPasswordIsHidden, setRepeatPasswordIsHidden] =
		useState<boolean>(true);

	const [editable, setEditable] = useState<boolean>(false);
	const schema = yup.object().shape({
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
		repeatPassword: yup
			.string()
			.required("Це поле обов'язкове")
			.oneOf([yup.ref("password")], "Паролі не співпадають"),
	});
	const { control, handleSubmit, setValue, getValues, formState } =
		useForm<IChangePasswordForm>({
			defaultValues: {
				password: "",
				repeatPassword: "",
			},
			resolver: yupResolver(schema),
		});



	function onSubmit(data: IChangePasswordForm) {
		async function func() {
			try {
				if (!token) return;
				const res = await fetch(`http://${HOST}/user/update-password`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ password: data.password }),
				});
				const result = await res.json();
				if (result.status === "success") {
					setValue("password", "");
					setValue("repeatPassword", "");
					setPasswordIsHidden(true);
					setRepeatPasswordIsHidden(true);
				} else {
					alert("Помилка при створені паролю");
				}
			} catch (error) {
				console.log("Помилка при оновленні:", (error as Error).message);
			}
		}
		func();
	}

	return (
		<View style={styles.profileCard}>
			<View style={styles.profileCardTop}>
				<Text
					style={{
						fontWeight: "700",
						fontFamily: "GTWalsheimPro-Regular",
					}}
				>
					Зміна паролю
				</Text>

				<ButtonEdit
					editable={editable}
					onPress={() => {
						if (editable) {
							handleSubmit(
								(data) => {
									onSubmit(data); 
									setEditable(false); 
								},
								(errors) => {
									console.log("Форма має помилки", errors);
								}
							)();
						} else {
							setEditable(true);
						}
					}}
				/>
			</View>

			{/* <View style={styles.view}> */}
			<Controller
				control={control}
				name="password"
				render={({ field, fieldState }) => (
					<ProfileCard
						label="Новий пароль"
						type="password"
						editable={editable}
						value={field.value}
						onChangeText={field.onChange}
						errorMessage={fieldState.error?.message}
						placeholder="********"
						isHidden={passwordIsHidden}
						setIsHidden={setPasswordIsHidden}
					/>
				)}
			/>

			<Controller
				control={control}
				name="repeatPassword"
				render={({ field, fieldState }) => (
					<ProfileCard
						label="Підтвердіть новий пароль"
						type="password"
						editable={editable}
						value={field.value}
						onChangeText={field.onChange}
						errorMessage={fieldState.error?.message}
						placeholder="********"
						isHidden={repeatPasswordIsHidden}
						setIsHidden={setRepeatPasswordIsHidden}
					/>
				)}
			/>
			{/* </View> */}
		</View>
	);
}
