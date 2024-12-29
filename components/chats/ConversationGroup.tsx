import React, { useEffect, useState, useContext } from 'react'
import { images } from '@/constants'
import { apiRequest } from "@/api/apiService";
import { router } from 'expo-router';
import { AuthContext } from '@/context';

import { View, Text, Image, TouchableOpacity } from 'react-native'

interface ConversationGroupProps {
    data: any,
    currentUser?: string,
    online?: boolean
}

export const ConversationGroup = ({ data }: ConversationGroupProps) => {
    return (
        <TouchableOpacity className='flex flex-row gap-5 items-center p-4 border-b border-gray-200' onPress={() => {}}>
            <View
                className='bg-fuchsia-50 h-10 w-10 flex items-center justify-center rounded-full'
            >
                <Text>
                    #
                </Text>
            </View>
            <View className='flex-1'>
                <Text className='font-bold text-white' >
                    { data.name }
                </Text>
                <Text className='text-gray-300'>
                    {data.members.length} members
                </Text>
            </View>
        </TouchableOpacity>
    )
}
