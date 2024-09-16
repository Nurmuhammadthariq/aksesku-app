
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { HomeIcon, ChatBubbleLeftRightIcon, UserIcon, EnvelopeIcon, PlusCircleIcon, AcademicCapIcon  } from 'react-native-heroicons/outline'
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { styled } from "nativewind";


import { icons } from "@/constants"

const StyledView = styled(View)

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

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Tabs

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
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default Layout;