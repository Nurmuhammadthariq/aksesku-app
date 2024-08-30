import { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
import { styled } from 'nativewind';
import * as SplashScreen from 'expo-splash-screen';

import PostActivity from '@/components/PostActivity';

const GradientBackground = styled(LinearGradient)
const StyledSafeAreaView = styled(SafeAreaView)

const Home = () => {
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <GradientBackground
            colors={["#3b21b7", "#8b64da", "#d195ee", "#cecbd3"]}
            locations={[0, 0.08, 0.73, 1]}
            className='flex-1'
        >
            <StyledSafeAreaView
                className='justify-center h-full'
            >

                <ScrollView className='px-[19px] mt-[20px]'>
                    {/* Header Search */}
                    <View className="flex-row justify-between items-center mt-2">
                        <View className='flex flex-row items-center bg-gray-800 rounded-full py-2 px-4 justify-between '>
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor="#ccc"
                                className="text-white w-[250px]"
                                inlineImageLeft='search_icon'
                            />
                            <Ionicons name='search' color="white" size={24} />
                        </View>
                        <TouchableOpacity className="ml-4">
                            <Ionicons name="notifications" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Story */}
                    <ScrollView horizontal className="flex-row mt-[27px]">
                        {['You', 'Edein', 'Sumei', 'Dicak', 'Vilen', 'Thoriq', 'Rezi', 'Eldy'].map((name, index) => (
                            <View key={index} className="items-center mr-4">
                                <View className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
                                    <Image
                                        source={images.imgStory}
                                        className='w-full h-full'
                                    />
                                </View>
                                <Text className="text-white text-xs mt-1">{name}</Text>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Post Activity */}
                    <PostActivity />

                </ScrollView>
            </StyledSafeAreaView>
        </GradientBackground>
    )
}

export default Home