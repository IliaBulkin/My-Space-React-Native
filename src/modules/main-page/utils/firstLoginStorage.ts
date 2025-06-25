// import AsyncStorage from "@react-native-async-storage/async-storage";

// const KEY_PREFIX = "first_login_shown_";

// export async function saveFirstLoginFlag(userId: number) {
// 	if (!userId) return;
// 	await AsyncStorage.setItem(`${KEY_PREFIX}${userId}`, "true");
// }

// export async function checkFirstLoginFlag(userId: number): Promise<boolean> {
// 	if (!userId) return false;
// 	const value = await AsyncStorage.getItem(`${KEY_PREFIX}${userId}`);
// 	return value === "true";
// }
