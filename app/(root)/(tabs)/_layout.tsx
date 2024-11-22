import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { HomeIcon, ChatBubbleLeftRightIcon, UserIcon, EnvelopeIcon, PlusCircleIcon, AcademicCapIcon } from 'react-native-heroicons/outline'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { styled } from "nativewind";
import { StaticDataContextProvider } from '@/context/static-data-context';
import { icons } from "@/constants"

import HomeScreen from "@/app/(root)/(tabs)/home";
import ChatScreen from "@/app/(root)/(tabs)/chat";
import ProfileScreen from "@/app/(root)/(tabs)/profile";
import PustakaScreen from "@/app/(root)/(tabs)/pustaka";
import CreateKegiatanPenyuluhanScreen from '../(tabs)/CreateKegiatanPenyuluhan'

const StyledView = styled(View)
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  // @ts-ignore
  <View
    className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-purple-500" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

function MainTab() {
  return (
    <StaticDataContextProvider>
      <Tab.Navigator
        initialRouteName='home'
        screenOptions={{
          tabBarActiveTintColor: "#cecbd3",
          tabBarInactiveTintColor: "black",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F2F2F2",
            borderTopWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            height: 80,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingBottom: 20,
            paddingTop: 10,
            borderTopColor: '#D0B0E2',
            borderRightColor: '#D0B0E2',
            borderLeftColor: '#D0B0E2',
            position: 'absolute',
          },
        }}
      >
        <Tab.Screen
          name='home'
          component={HomeScreen}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <HomeIcon color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name='chat'
          component={ChatScreen}
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color }) => <EnvelopeIcon color={color} size={30} />,
          }}
        />
        <Tab.Screen
          name='CreateKegiatanPenyuluhan'
          component={CreateKegiatanPenyuluhanScreen}
          options={{
            title: "CreateKegiatanPenyuluhanScreen",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <StyledView className="bg-[#6A5495] w-16 h-16 rounded-full items-center justify-center absolute -top-8">
                <PlusCircleIcon color={color} size={30} />
              </StyledView>
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => <UserIcon color={color} size={30} />,
          }}
        />
        <Tab.Screen
          name="pustaka"
          component={PustakaScreen}
          options={{
            title: "Pustaka",
            headerShown: false,
            tabBarIcon: ({ color }) => <AcademicCapIcon color={color} size={30} />,
          }}
        />
      </Tab.Navigator>
    </StaticDataContextProvider>
  )
}
const Layout = () => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack.Navigator>
          <Stack.Screen
            name='MainTabs'
            component={MainTab}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        {/* <Tabs

          initialRouteName="home"
          screenOptions={{
            tabBarActiveTintColor: "#6A5495",
            tabBarInactiveTintColor: "black",
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#F2F2F2",
              borderTopWidth: 2,
              borderRightWidth: 2,
              borderLeftWidth: 2,
              height: 80,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              paddingBottom: 20,
              paddingTop: 10,
              borderTopColor: '#D0B0E2',
              borderRightColor: '#D0B0E2',
              borderLeftColor: '#D0B0E2',
              position: 'absolute',
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color  }) => (
                <HomeIcon color={color} size={30} />
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: "Chat",
              headerShown: false,
              tabBarIcon: ({ color }) => <EnvelopeIcon color={color} size={30} />,
            }}
          />
          <Tabs.Screen
            name="createKegiatanPenyuluhan"
            options={{
              title: "Create",
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <StyledView className="bg-[#6A5495] w-16 h-16 rounded-full items-center justify-center absolute -top-8">
                  <PlusCircleIcon color={color} size={30} />
                </StyledView>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color }) => <UserIcon color={color} size={30} />,
            }}
          />
          <Tabs.Screen
            name="pustaka"
            options={{
              title: "Pustaka",
              headerShown: false,
              tabBarIcon: ({ color }) => <AcademicCapIcon color={color} size={30} />,
            }}
          />
        </Tabs> */}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default Layout;