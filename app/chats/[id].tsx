import React, { useEffect, useRef, useState } from 'react'
import { apiRequest } from "@/api/apiService";
import { useContext } from 'react'
import { AuthContext } from '@/context'
import { useLocalSearchParams } from 'expo-router'
import { Stack } from 'expo-router'
import { images } from '@/constants'
import { Socket, io } from "socket.io-client";


import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { ChatBox } from '@/components/chats/ChatBox';


// Define the type for route parameters
type ChatDetailParams = {
  id: string; // The dynamic route parameter (chat ID)
};



const DetailChatPage = () => {
  const [userData, setUserData] = React.useState<any>(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState({})
  const [receivedMessage, setReceivedMessage] = useState(null);

  const socket = useRef<Socket | null>(null);

  const { id } = useLocalSearchParams<ChatDetailParams>()
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await apiRequest(`/userAksesku/${id}`, 'GET')
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUserData()
  }, [id])

  useEffect(() => {
    socket.current = io("http://192.168.207.236:8800");
    socket.current.on("recieve-message", (data) => {
      console.log('data', data)
      setReceivedMessage(data);
    }

    );
  }, []);

  useEffect(() => {
    socket.current = io("http://192.168.207.236:8800");
    socket.current.emit("new-user-add", user?.id);
    socket.current.on("get-users", (users) => {
      // console.log(users)
      setOnlineUsers(users);
    })
  }, [user])

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  

  const checkOnlineUser = onlineUsers.find((user: any) => user.userId === id);


  return (
    <>
      <View className='flex-1 bg-[#2C2649]'>
        <Stack.Screen
          options={{
            title: 'helep',
            headerTitle: () => {
              return (
                <View className='flex flex-row items-center'>
                  <Image
                    className='w-[50px] h-[50px] rounded-full ml-0 mr-2'
                    source={images.chatPersonImage}
                  />
                  <View className='flex-1'>
                    <Text className='text-base font-bold text-white'>
                      {userData?.firstname + ' ' + userData?.lastname}
                    </Text>
                    <Text className={checkOnlineUser ? 'text-green-500 mt-1' : 'text-red-500'}>
                      {checkOnlineUser ? 'Online' : 'Offline'}
                    </Text>
                  </View>
                </View>
              )
            },
          }}
        />

        <ChatBox
          currentUser={user?.id}
          receiver={id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </View>
    </>
  )
}

export default DetailChatPage