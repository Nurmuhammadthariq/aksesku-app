import { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
import { styled } from 'nativewind';
import { useKegiatanPenyuluhanContext } from '@/context/kegiatan-penyuluhan/kegiatan-penyuluhan-context';

import FeedActivity from '@/components/common/FeedActivity';

const GradientBackground = styled(LinearGradient)
const StyledSafeAreaView = styled(SafeAreaView)

const Home = () => {

    const { refetch } = useKegiatanPenyuluhanContext()

    const reloadData = () => {
        refetch()
    }

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
                    <FeedActivity />
                </ScrollView>
                <TouchableOpacity style={styles.floatingButton} onPress={reloadData}>
                    <Ionicons name='reload' size={24} color="white" />
                </TouchableOpacity>
            </StyledSafeAreaView>
        </GradientBackground>

    )
}

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 100, // Adjust the position from the bottom
        right: 20,  // Adjust the position from the right
        backgroundColor: '#2196F3', // Button color
        width: 60,                  // Button width
        height: 60,                 // Button height
        borderRadius: 30,           // Make it circular
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,               // Add shadow for Android
        shadowColor: '#000',        // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',              // Text color
        fontSize: 24,               // Font size
        fontWeight: 'bold',
    },
});

export default Home;