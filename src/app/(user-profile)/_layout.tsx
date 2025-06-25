import { Stack } from "expo-router";
import { Header } from "../../shared/ui/header";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            contentStyle: { backgroundColor: "#FFFFFF" },
            header: () => <Header isOnSettings={false}/>,
        }}>

        </Stack>
                
    );
}