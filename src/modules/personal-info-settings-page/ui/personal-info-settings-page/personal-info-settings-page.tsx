import {
	TouchableOpacity,
	View,
	Text,
	Image,
	ScrollView,
	FlatList,
	Platform,
	Pressable,
} from "react-native";
// import { Input } from "../../../../shared/ui/input";
import { styles } from "./personal-info-settings-page.styles";
import { ICONS } from "../../../../shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../../auth/context";
import { HeaderNavigationSettingsPages } from "../header-navigation-settings-pages";
import { ProfileCard } from "../../../../shared/ui/profileCard";
// import { IUser } from "../../../auth/context/context.types";
import { Avatar } from "../avatar";
import { Response } from "../../../../shared/types";
import parsePhoneNumberFromString, {
	isValidPhoneNumber,
} from "libphonenumber-js";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ButtonEdit } from "../buttonEdit";

interface IPersonalInfoFormData {
	name: string;
	surname: string;
	// username: string;
	email: string;
	phoneNumber: string;
	birthDate: Date | null;
}

export function PersonalInfoSettingsPage() {
	const router = useRouter();
	const { user, token, getData } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);


	const [show, setShow] = useState(false);

	function showDatepicker() {
		setShow(true);
	}

	if (!user) {
		throw Error("Ви не авторизовані!");
	}

	const { control, handleSubmit, setValue, getValues } =
		useForm<IPersonalInfoFormData>({
			defaultValues: {
				name: "",
				surname: "",
				birthDate: null,
				email: "",
				phoneNumber: "",
				// username: "",
			},
		});

	useEffect(() => {
		if (user) {
			setValue("name", user.name ? user.name : "");
			setValue("surname", user.surname ? user.surname : "");
			setValue(
				"birthDate",
				user.birthDate ? new Date(user.birthDate) : null
			);
			setValue("email", user.email ? user.email : "");
			// setValue("username", user.username ? user.username : "");
			setValue(
				"phoneNumber",
				user.phoneNumber
					? parsePhoneNumberFromString(
							user.phoneNumber
					  )!.formatInternational()
					: ""
			);
		}
	}, [user]);

	function onSubmit(data: IPersonalInfoFormData) {
		console.log("1", data);

		async function sendRequest() {
			try {
				if (!token) {
					return
				};
				const res = await fetch(
					"http://192.168.3.11:3011/user/update",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify(data),
					}
				);
				const result: Response<string> = await res.json();
				getData(token);
				setEditable(false);
				console.log("4", result);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		sendRequest();
	}

	return (
		<ScrollView style={styles.personalInfoSettings} overScrollMode="never">
			<HeaderNavigationSettingsPages />
			<View>
				<Avatar />

				<View style={styles.personalInfo}>
					<View style={styles.personalInfoTop}>
						<Text
							style={{
								fontWeight: "700",
								fontFamily: "GTWalsheimPro-Regular",
							}}
						>
							Особиста інформація
						</Text>
						<ButtonEdit
							editable={editable}
							onPress={() => {
								if (editable) {
									handleSubmit(onSubmit)();
								} else{
									setEditable(true)
								}
								
							}}
						/>
					</View>

					<Controller
						control={control}
						name="name"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.name ? undefined : "Не вказано :("
								}
								label="Ім'я"
								type="text"
								editable={editable}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="surname"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.surname ? undefined : "Не вказано :("
								}
								label="Прізвище"
								type="text"
								editable={editable}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="email"
						rules={{
							required: {value: true, message: "Пошта не може бути порожньою!"},
							
						}}
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.email ? undefined : "Не вказано :("
								}
								label="Електронна пошта"
								type="email"
								editable={editable}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="phoneNumber"
						rules={{
							validate: (value) => {
								if (value === "") return true;
								if (!isValidPhoneNumber(value))
									return "Невалідний номер телефона";
								return true;
							},
						}}
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.phoneNumber
										? undefined
										: "Не вказано :("
								}
								label="Мобільний (з кодом країни)"
								type="tel"
								editable={editable}
								value={field.value}
								onChangeText={field.onChange}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="birthDate"
						render={({ field }) => {
							return (
								<>
									<Pressable
										onPress={
											editable
												? showDatepicker
												: undefined
										}
									>
										<ProfileCard
											label="Дата народження"
											value={
												field.value
													? field.value.toLocaleDateString()
													: "Оберіть дату народження"
											}
											editable={editable}
											type="date"
										/>
									</Pressable>
									{show && (
										<DateTimePicker
											value={field.value ?? new Date()}
											mode="date"
											display={
												Platform.OS === "ios"
													? "spinner"
													: "default"
											}
											onChange={(event, selectedDate) => {
												setShow(Platform.OS === "ios");
												if (!selectedDate) return;
												console.log(
													"onChange",
													selectedDate
												);
												field.onChange(selectedDate);
											}}
											maximumDate={new Date()}
											minimumDate={new Date(1900, 0, 1)}
										/>
									)}
								</>
							);
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
