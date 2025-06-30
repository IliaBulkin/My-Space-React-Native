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
import { HOST, PORT } from "../../../../shared/base-url";
import { ChangePassword } from "../change-password";

interface IPersonalInfoFormData {
	first_name: string;
	last_name: string;
	// username: string;
	email: string;
	// phoneNumber: string;
	date_of_birth: Date | null;
}

export function PersonalInfoSettingsPage() {
	const router = useRouter();
	const { user, token, getData } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);

	const [show, setShow] = useState(false);

	function showDatepicker() {
		setShow(true);
	}

	const { control, handleSubmit, setValue, getValues } =
		useForm<IPersonalInfoFormData>({
			defaultValues: {
				first_name: "",
				last_name: "",
				date_of_birth: null,
				email: "",
			},
		});
	if (!user) {
		return null;
	}
	useEffect(() => {
		if (user) {
			setValue("first_name", user.first_name ? user.first_name : "");
			setValue("last_name", user.last_name ? user.last_name : "");
			setValue(
				"date_of_birth",
				user.profile?.date_of_birth
					? new Date(user.profile.date_of_birth)
					: null
			);
			setValue("email", user.email ? user.email : "");
		}
	}, [user]);

	function onSubmit(data: IPersonalInfoFormData) {
		async function sendRequest() {
			try {
				if (!token) {
					return;
				}
				const res = await fetch(`http://${HOST}/user/update`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(data),
				});
				const result: Response<string> = await res.json();
				getData(token);
				setEditable(false);
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
								} else {
									setEditable(true);
								}
							}}
						/>
					</View>

					<Controller
						control={control}
						name="first_name"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.first_name
										? undefined
										: "Не вказано :("
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
						name="last_name"
						render={({ field, fieldState }) => (
							<ProfileCard
								placeholder={
									user.last_name ? undefined : "Не вказано :("
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
							required: {
								value: true,
								message: "Пошта не може бути порожньою!",
							},
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
						name="date_of_birth"
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
				<ChangePassword />
			</View>
		</ScrollView>
	);
}
