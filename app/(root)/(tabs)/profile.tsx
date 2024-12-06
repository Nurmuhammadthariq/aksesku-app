import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native"
import { router } from "expo-router";

import { Button, Alert, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../context';
import { apiRequest } from "@/api/apiService";

const Profile = () => {
    const { signOut, user } = useContext(AuthContext)
    // console.log(user)

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        if (signOut) {
                            signOut()
                        }
                    },
                },
            ],
        );
    };



    const handleSyncUser = async () => {
        try {
            const dataUser = {
                "idAksesku": user?.id,
                "username": user?.username,
                "firstname": user?.username,
                "lastname": user?.username
            }
            // console.log(JSON.stringify(dataUser))
            // replace with your actual post URL
            const response = await apiRequest('/auth/sync-user-aksesku/aksesku', 'POST', dataUser);
            console.log(response.message)

        } catch (error) {
            throw error
        }
    }

    return (
        <SafeAreaView>
            <Text>
                THIS PAGE PROFILE
            </Text>
            <Button title="Logout" onPress={handleLogout} />
            <View className="mt-10">
                <Button title="SyncUser" onPress={handleSyncUser} />
            </View>
        </SafeAreaView>
    )
}


export default Profile