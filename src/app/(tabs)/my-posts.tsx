import { ScrollView } from "react-native";
import { MyPostsPage } from "../../modules/my-posts-page/ui"


export default function MyPosts() {
    return (
        <ScrollView style={{ backgroundColor: "#FAF8FF" }} overScrollMode="never">
            <MyPostsPage></MyPostsPage>
        </ScrollView>
    );
}
