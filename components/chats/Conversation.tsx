import React, { useEffect, useState, useContext } from 'react'
import { images } from '@/constants'
import { apiRequest } from "@/api/apiService";
import { router } from 'expo-router';
import { AuthContext } from '@/context';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

interface ConversationProps {
    data: any,
    currentUser?: string,
    online?: boolean
}

export const Conversation = ({ data, currentUser, online }: ConversationProps) => {
    const [userData, setUserData] = useState<any>(null);
    const { setChatId } = useContext(AuthContext);
    
    const userId = data?.members?.find((member: string) => member !== currentUser);

    
    useEffect(() => {
        setChatId?.(data._id)
        const getUserData = async () => {
            try {
                const { data } = await apiRequest(`/userAksesku/${userId}`, 'GET')
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }

        getUserData()
    }, [userId])
    // console.log('idObject',data._id)
   

    return (
        <TouchableOpacity className='flex flex-row items-center p-4 border-b border-gray-200' onPress={() => router.push(`/chats/${userId}`) }>
            <Image className='w-12 h-12 rounded-full mr-4' source={images.chatPersonImage} />
            <View className='flex-1'>
                <Text className='font-bold text-white' >
                    {userData?.firstname + ' ' + userData?.lastname }
                </Text>
                <Text className={ online ? 'text-green-500 mt-1' : 'text-red-500' }>
                    {online ? 'Online' : 'Offline'}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

