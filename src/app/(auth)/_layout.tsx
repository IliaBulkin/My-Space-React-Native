import { Stack } from "expo-router";
import { Header } from "../../shared/ui/header";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            contentStyle: { backgroundColor: "#E9E5EE" },
            header: () => <Header.HeaderAuth/>,
        }}>

        </Stack>
                
    );
}