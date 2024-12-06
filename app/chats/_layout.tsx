import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#635A8F',
                },
                title: 'help'
            }}
        >
            <Stack.Screen
                name="[id]"
                options={{ headerShown: true }}

            />
        </Stack>
    )
}