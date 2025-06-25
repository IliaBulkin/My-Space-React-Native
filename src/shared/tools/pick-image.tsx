import { ImagePickerOptions, launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
// Это компонент, который можно будет использовать там, где не нужны "особые условия" для картинки, например - чтобы отправить картинку в чате.
// Если же нужны будут доп. настройки, то этот компонент лучше не использовать.
// Комментарии на будущее, если забудешь, зачем этот компонент вообще нужен.
// бесполезный он короче
export async function pickImage(options?: ImagePickerOptions){
    const result = await requestMediaLibraryPermissionsAsync()
    if (result.status === "granted") {
        const images = await launchImageLibraryAsync(options)

        if (images.assets) {
            return images.assets
        }
    } else {
        return null
    }
}