import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { Stack, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import client from '../ApolloClient';
import 'react-native-reanimated';
import { AuthContextProvider } from '../context';
import { en, registerTranslation } from 'react-native-paper-dates';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

registerTranslation('en', en)

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <NativeBaseProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
            <Stack.Screen name="chats" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </NativeBaseProvider>
      </AuthContextProvider>
    </ApolloProvider>

  );
}
