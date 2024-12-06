import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react'
import { apiRequest } from "@/api/apiService";
import { AuthContext } from '@/context'

import { Text, View, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, ScrollView, Button, Pressable } from 'react-native'
import { MessageItem } from './MessageItem';

type Message = {
    _id: string;
    chatId: string;
    senderId: string; // Message sender type
    text: string;
    time?: string; // Optional time field
};

interface ChatBoxProps {
    currentUser?: string
    receiver?: string
    setSendMessage: (message: object) => void
    receivedMessage?: any
}
export const ChatBox = ({ currentUser, receiver, setSendMessage, receivedMessage }: ChatBoxProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const { user, chatId } = useContext(AuthContext);

    const handleChange = (newMessage: string) => {
        setNewMessage(newMessage);
    }

    useEffect(() => {

        const getMessages = async () => {
            try {
                const { data } = await apiRequest(`/messageAksesku/${chatId}`, 'GET')
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }

        if (chatId !== null) getMessages();
    }, [chatId])

    useEffect(() => {
        if (messages.length > 0) {
            flatList.current?.scrollToEnd({ animated: true });
        }
    }, [messages])

    const handleSendMessage = async (e: any) => {
        e.preventDefault()
        const message = {
            chatId: chatId,
            senderId: currentUser,
            text: newMessage
        }

        const receiverId = receiver
        setSendMessage({ ...message, receiverId })
        try {
            const { data } = await apiRequest('/messageAksesku', 'POST', message)
            setMessages([...messages, data])
            setNewMessage('')
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chatId) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage])
    // console.log(receivedMessage)

    const scrollRef = useRef<ScrollView | null>(null)
    const flatList = useRef<FlatList | null>(null)
    return (
        <>
            <FlatList
                ref={flatList}
                className='pl-4 pr-4 bg-red-700'
                data={messages}
                keyExtractor={(item, index) => { 
                    // console.log(index.toString())
                    return index.toString()
                 }}
                renderItem={({ item}) => {
                    // console.log(index)
                    return (
                        <MessageItem
                            key={item._id}                        
                            item={item} 
                        />
                    )
                }}
                onContentSizeChange={() => flatList.current?.scrollToEnd({ animated: true })}
            />

            <View className='flex flex-row items-center p-3 bg-[#3A2E5F] '>
                <TextInput
                    className='flex-1 p-3 text-base bg-[#50436E] text-white rounded-lg mr-2'
                    placeholder='write a message...'
                    placeholderTextColor="#ffffff"
                    value={newMessage}
                    onChangeText={handleChange}
                />
                <Pressable
                    className='bg-[#7C65C7] py-2 px-4 rounded-lg'
                    onPress={handleSendMessage}
                >
                    <Text className='text-white text-base font-bold'>Send</Text>
                </Pressable>
            </View>
        </>
    )
}
