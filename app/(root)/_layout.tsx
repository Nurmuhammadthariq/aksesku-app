import { Stack } from "expo-router";
import { LogBox } from "react-native"
import { useEffect } from "react";

const Layout = () => {
    useEffect(() => {
        LogBox.ignoreLogs(["In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app."])
    }, [])
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default Layout;