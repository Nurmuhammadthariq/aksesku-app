import { useEffect, useState, useRef } from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { AuthContext } from "@/context";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native"
import { UserGroupIcon, ChatBubbleLeftRightIcon } from 'react-native-heroicons/outline'
import { styled } from 'nativewind';
import { Icon } from "native-base";
import { apiRequest } from "@/api/apiService";
import { Conversation } from "@/components/chats/Conversation";
import { Socket, io } from "socket.io-client";

const GradientBackground = styled(LinearGradient)

const Chat = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const { user } = useContext(AuthContext);
    const socket = useRef<Socket | null>(null);


    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await apiRequest(`/chatAksesku/${user?.id}`, 'GET')
                setChats(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats()
    }, [user?.id])

    useEffect(() => {
        socket.current = io("http://192.168.250.37:8800");
        socket.current.emit("new-user-add", user?.id);
        socket.current.on("get-users", (users) => {
            // console.log(users)
            setOnlineUsers(users);
        })
    }, [user]);

    const checkOnlineStatus = (chat: any) => {
        const chatMember = chat.members.find((member: any) => member !== user?.id);
        const online = onlineUsers.find((user: any) => user.userId === chatMember);

        return online ? true : false;
    };

    return (
        <View className="flex-1 flex-row">
            {/* Sidebar */}

            <View className="w-[70px] bg-[#C58DEA] flex flex-col items-center justify-between py-12 shadow-lg z-10">
                <View className="flex-1">
                    <UserGroupIcon size={30} color="#FFF" style={styles.sidebarIcon} />
                    <ChatBubbleLeftRightIcon size={30} color="#FFF" style={styles.sidebarIcon} />
                    <Icon name="archive" size={30} color="#FFF" style={styles.sidebarIcon} />
                    <Icon name="dots-horizontal" size={30} color="#FFF" style={styles.sidebarIcon} />
                </View>
            </View>


            {/* Main Screen */}
            <GradientBackground
                colors={["#3b21b7", "#8b64da", "#d195ee", "#cecbd3"]}
                locations={[0, 0.08, 0.73, 1]}
                style={styles.mainScreen}
            >
                <View className="flex flex-row items-center p-4 mt-12">
                    {/* <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
                        <Icon name="menu" size={30} color="#FFF" />
                    </TouchableOpacity> */}
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#999"
                        className="flex-1 bg-white rounded-full px-4 ml-4 text-black"
                    />
                </View>
                {chats.map((chat: any, index) => {
                    return (
                        <Conversation
                            data={chat}
                            key={index}
                            currentUser={user?.id}
                            online={checkOnlineStatus(chat)}
                        />
                    )
                })}

            </GradientBackground>
        </View >
    )
}

const styles = StyleSheet.create({
    sidebarCloseButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    sidebarIcon: {
        marginVertical: 20,
    },
    mainScreen: {
        flex: 1,
    },
});

export default Chat