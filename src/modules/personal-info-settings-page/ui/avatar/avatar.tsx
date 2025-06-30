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
import { HOST, PORT } from "../../../../shared/base-url";

export function Avatar() {
	const [avatar, setAvatar] = useState<string>("");

	// useEffect(() => {
	// 	console.log(avatar);
	// }, [avatar]);
	const { token, getData, user } = useAuthContext();

	const [editable, setEditable] = useState<boolean>(false);

	const { control, handleSubmit, setValue, getValues } = useForm<IAvatarForm>(
		{
			defaultValues: {
				username: "",
				avatar: "",
			},
		}
	);

	if (!user) {
		return null
	}

	useEffect(() => {
		if (user) {
			setValue("username", user.username ? user.username : "");
			const avatarPath = user.profile?.avatars?.[0]?.image;

			const avatarUrl = avatarPath
				? `http://${HOST}/media/${avatarPath}`
				: "";

			setValue("avatar", avatarUrl);
			setAvatar(avatarUrl);
		}
	}, [user]);

	function pickImageHandler() {
		async function pickImageAsync() {
			try {
				const image = await pickImage({
					allowsMultipleSelection: false,
					base64: true,
					
				});

				if (!image || !image[0].base64) return;

				let mimeType = image[0].mimeType
				if (mimeType === "image/") {
					mimeType = "image/jpeg"
				}
				const base64WithPrefix = `data:${mimeType};base64,${image[0].base64}`;
				setAvatar(base64WithPrefix);
			} catch (error) {
				console.log((error as Error).message);
			}
		}
		pickImageAsync();
	}


	function deleteAvatar() {
		setValue("avatar", "");
		setAvatar("");
	}

	function onSubmit(data: IAvatarForm) {
		async function func() {
			try {
				if (!token) return;

				const res = await fetch(
					`http://${HOST}/user/update-avatar`,
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
				{editable && (
					<Text style={styles.topText}>
						Оберіть або завантажте фото профілю
					</Text>
				)}

				<View style={styles.view}>
					{avatar ? (
						<Image
							style={{
								height: 150,
								width: 150,
								borderRadius: 150,
							}}
							source={{ uri: avatar }}
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
								<ICONS.PlusWithoutBorder
									width={17}
									height={17}
								/>
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
						{user?.last_name} {user?.first_name}
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
