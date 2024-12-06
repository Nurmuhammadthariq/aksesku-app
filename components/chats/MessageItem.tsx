import React, { useContext } from 'react'
import { AuthContext } from '@/context'

import { View, Text } from 'react-native'

export const MessageItem = ({ item }: any) => {
    const { user, chatId } = useContext(AuthContext);

    return (
        <View
            className={`max-w-[70%] mb-3 p-2 rounded-lg ${item.senderId === user?.id ? 'self-end bg-[#3A2E5F]' : 'self-start bg-[#3A2E5F]'}`}
        >
            <Text className='text-white text-base'>{item.text}</Text>
            {item.time && <Text className='text-white text-xs mt-1'>{item.time}</Text>}
        </View>
    )
}