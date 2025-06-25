import { Redirect } from "expo-router";
import { ScrollView, Text } from "react-native";


export default function Chats() {
    return (
        // <ScrollView style={{ backgroundColor: "#FAF8FF" }}>
        //     <Text>Chats</Text>
        // </ScrollView>
        <Redirect href={"/contacts"}/>
    );
}
