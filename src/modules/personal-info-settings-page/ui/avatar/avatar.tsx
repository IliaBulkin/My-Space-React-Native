import { View, Image, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../../../shared/ui/icons";
import { IAvatarForm, IAvatarProps } from "./avatar.types";
import { styles } from "./avatar.styles";
import { pickImage } from "../../../../shared/tools";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../auth/context";
import { Response } from "../../../../shared/types";
import { ProfileCard } from "../../../../shared/ui/profileCard";
import { ButtonEdit } from "../buttonEdit";
import { Controller, useForm } from "react-hook-form";

export function Avatar() {
	const [avatar, setAvatar] = useState<string>("");

	const { token, getData, user } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);

	const { control, handleSubmit, setValue, getValues } = useForm<IAvatarForm>(
		{
			defaultValues: {
				username: "",
				image: "",
			},
		}
	);

	if (!user) {
		throw Error("Ви не авторизовані");
	}

	useEffect(() => {
		if (user) {
			setValue("username", user.username ? user.username : "");
			setValue("image", user.image ? user.image : "");
			setAvatar(user.image ? user.image : "");
		}
	}, [user]);

	function pickImageHandler() {
		async function pickImageAsync() {
			try {
				const image = await pickImage({
					allowsMultipleSelection: false,
					base64: true,
				});
				if (!image) return;
				if (!image[0].base64) return;
				setAvatar(image[0].base64);
				setValue("image", image[0].base64);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		pickImageAsync();
	}

	function deleteAvatar() {
		setValue("image", "");
		setAvatar("");
	}

	function onSubmit(data: IAvatarForm) {
		async function func() {
			try {
				if (!token) return;

				const res = await fetch(
					"http://192.168.3.11:3011/user/update-avatar",
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
					Картка профілю
				</Text>

				<ButtonEdit
					editable={editable}
					onPress={() => {
						if (editable) {
							handleSubmit(onSubmit)();
						}
						setEditable(!editable);
					}}
				/>
			</View>
			<View style={styles.avatar}>
				{editable && <Text style={styles.topText}>Оберіть або завантажте фото профілю</Text>}

				<View style={styles.view}>
					{avatar ? (
						<Image
							style={{
								height: 150,
								width: 150,
								borderRadius: 150,
							}}
							source={{ uri: "data:image/jpeg;base64," + avatar }}
						/>
					) : (
						<ICONS.AnonymousLogoIcon width={160} height={160} />
					)}

					{editable && (
						<View style={styles.buttonAvatarView}>
							<TouchableOpacity
								style={styles.buttonAvatar}
								onPress={() => {
									pickImageHandler();
								}}
							>
								<ICONS.PlusWithoutBorder width={17} height={17} />
								<Text style={styles.textAvatar}>
									Додати фото
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.buttonAvatar}
								onPress={() => {
									deleteAvatar();
								}}
							>
								<ICONS.TrashCanIcon width={17} height={17} />
								<Text style={styles.textAvatar}>
									Видалити фото
								</Text>
							</TouchableOpacity>
						</View>
					)}

					<Text style={styles.nameSurname}>
						{user?.surname} {user?.name}
					</Text>

					{editable ? (
						<Controller
							control={control}
							name="username"
							render={({ field, fieldState }) => (
								<ProfileCard
									label="Нікнейм користувача"
									type="text"
									editable={editable}
									value={field.value}
									onChangeText={field.onChange}
									errorMessage={fieldState.error?.message}
								/>
							)}
						/>
					) : user.username ? (
						<Text style={styles.username}>@{user.username}</Text>
					) : null}
				</View>
			</View>
		</View>
	);
}
