import { useEffect, useState, useRef } from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { AuthContext } from "@/context";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Button, Modal, Alert, Pressable } from "react-native"
import { MultiSelect, Option } from "@/components/chats/MultiSelect";
import { Ionicons } from "@expo/vector-icons";
import { UserGroupIcon, ChatBubbleLeftRightIcon } from 'react-native-heroicons/outline'
import { styled } from 'nativewind';
import { FormControl } from "native-base";
import { apiRequest } from "@/api/apiService";
import { Conversation } from "@/components/chats/Conversation";
import { ConversationGroup } from "@/components/chats/ConversationGroup";
import { Socket, io } from "socket.io-client";

const GradientBackground = styled(LinearGradient)

const Chat = () => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [displayMessage, setDisplayMessage] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [allUsers, setAllUsers] = useState<Option[]>([]);
    const [forums, setForums] = useState<any[]>([]);
    const [forumName, setForumName] = useState<string>('');
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
        const getAllUsers = async () => {
            try {
                const { data } = await apiRequest(
                    `/userAksesku`,
                    'GET',
                    null,
                    {
                        currentUser: user?.id ?? ''
                    }
                )
                setAllUsers(data)
            } catch (error) {
                console.log(error)
            }
        }

        getAllUsers()
        getChats()
    }, [user?.id])

    useEffect(() => {
        const getForums = async () => {
            try {
                const { data } = await apiRequest(
                    `/forum/get-user-forums`,
                    'GET',
                    null,
                    {
                        currentUser: user?.id ?? ''
                    }
                )
                setForums(data?.forums)
            } catch (error) {
                console.log(error)
            }
        }

       getForums()
    }, [forums])

    useEffect(() => {
        socket.current = io("http://192.168.207.236:8800", {
            withCredentials: true,
            query: { userId: user?.id },
        });
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

    const onSubmit = async () => {
        try {
            const name = forumName
            const members = selectedOptions.map((option) => option.id);

            const body = {
                name,
                members
            }

            const { data } = await apiRequest(
                `/forum/create-forum`,
                'POST',
                body,
                {
                    currentUser: user?.id ?? ''
                }
            )
            setForumName('')
            setSelectedOptions([])
            setModalVisible(false)
            socket.current = io("http://192.168.207.236:8800");
            socket.current.emit("add-forum-notify", data.forum);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className="flex-1 flex-row">
            {/* Sidebar */}

            <View className="w-[70px] bg-[#C58DEA] flex flex-col items-center justify-between py-12 shadow-lg z-10">
                <View className="flex-1">
                    <TouchableOpacity onPress={() => setDisplayMessage(true)}>
                        <ChatBubbleLeftRightIcon size={30} color="#FFF" style={styles.sidebarIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setDisplayMessage(false)}
                        className=""
                    >
                        <UserGroupIcon size={30} color="#FFF" style={styles.sidebarIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible)
                }}
            >
                <View className="justify-center items-center">
                    <View className="m-5 bg-[#181920] p-6 shadow-lg w-[300px] h-[500px] rounded-lg">
                        <Text
                            className="font-PoppinsBold self-start mb-[20px] text-xl tracking-tight leading-none text-white"
                        >
                            Create Forum Group
                        </Text>

                        <FormControl
                            w="full"
                            className='mb-[10px]'
                        >
                            <View
                                className="w-full 
                                    pt-[11px] 
                                    pl-[19px] 
                                    rounded-[10px] 
                                    border-white 
                                    border-[3px] 
                                    shadow 
                                    h-[53px] mb-7"
                            >
                                <TextInput
                                    className="text-white text-base font-PoppinsRegular"
                                    placeholder="Masukan nama forum"
                                    placeholderTextColor="white"
                                    defaultValue={forumName}
                                    onChangeText={newText => setForumName(newText)}
                                />
                            </View>

                            <MultiSelect
                                options={allUsers}
                                selectedOptions={selectedOptions}
                                onSelectionChange={setSelectedOptions}
                            />


                        </FormControl>

                        <View
                            className="flex-row justify-between items-center"
                        >
                            <Pressable
                                className="rounded-md p-[10px] bg-[#3A2E5F] h-10"
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text className="text-white font-bold">Close Modal</Text>
                            </Pressable>
                            <Pressable
                                className="rounded-md p-[10px] bg-[#3A2E5F] h-10"
                                onPress={() => onSubmit()}
                            >
                                <Text className="text-white font-bold">Create Forum</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* Main Screen */}
            {displayMessage ? (
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

            ) : (
                <GradientBackground
                    colors={["#3b21b7", "#8b64da", "#d195ee", "#cecbd3"]}
                    locations={[0, 0.08, 0.73, 1]}
                    style={styles.mainScreen}
                >
                    <View className="flex gap-2 flex-row items-center p-4 mt-12">
                        {/* <TouchableOpacity onPress={() => setIsSidebarOpen(true)}>
                            <Icon name="menu" size={30} color="#FFF" />
                        </TouchableOpacity> */}
                        <TextInput
                            placeholder="Search forum"
                            placeholderTextColor="#999"
                            className="flex-1 bg-white rounded-full px-4 ml-4 text-black"
                        />
                        <TouchableOpacity
                            className="bg-[#2196F3] rounded-full h-[30px] w-[30px] justify-center items-center"
                            onPress={() => setModalVisible(true)}
                        >
                            <Ionicons name="add-circle-outline" size={24} color="#FFF" />
                        </TouchableOpacity>

                    </View>
                    {forums.map((forum: any, index) => (
                        <ConversationGroup
                            key={index}
                            data={forum}
                        />
                    ))}

                </GradientBackground>
            )}
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
    container: {
        backgroundColor: '#181920',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    dropdownMenu: {
        backgroundColor: '#181920',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
    },
    dropdownInputGroup: {
        backgroundColor: '#181920',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
    },
    listContainer: {
        backgroundColor: '#181920',
        zIndex: 1000, // Ensure it is above other elements
        borderRadius: 10,
        padding: 10,
    },
    dropdownText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlignVertical: 'center',
        height: '100%',
        backgroundColor: '#181920',
    },
    placeholderText: {
        color: '#181920'
    }
});

export default Chat