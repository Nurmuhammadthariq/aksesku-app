import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';

const PostActivity = () => {
    return (
        <View className='bg-[#8C63D8] rounded-xl mt-4 p-4'>
            <View className="flex-row items-center">
                <TouchableOpacity>
                    <Image
                        source={images.imgStory}
                        className="w-10 h-10 rounded-full"
                    />
                </TouchableOpacity>
                <View className="ml-4">
                    <Text className="text-white font-semibold">Edein Vindain</Text>
                    <Text className="text-gray-300 text-xs">5 minutes ago</Text>
                </View>
                <TouchableOpacity className="ml-auto">
                    <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Text className="text-white mt-2">
                This is a beautiful sky that I took last week. It's great, right? :)

            </Text>

            <Image
                source={images.imgPenyuluh} // Replace with actual image
                className="w-full h-40 rounded-lg mt-2"
            />

            <View className="flex-row justify-between mt-4">
                <View className="flex-row items-center mr-2">
                    <TouchableOpacity className="mr-2">
                        <FontAwesome name="heart" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white">999</Text>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity className="mr-2">
                        <FontAwesome name="comment" size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white">320</Text>
                </View>
                <TouchableOpacity className="ml-auto">
                    <Ionicons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostActivity