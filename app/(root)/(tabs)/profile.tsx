import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native"
import { router } from "expo-router";

import { Button, Alert } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../../context';
import { removeToken } from "../../../utils";

const Profile = () => {
    const { signOut, user } = useContext(AuthContext)
    console.log(user)

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

    return (
        <SafeAreaView>
            <Text>
                THIS PAGE PROFILE
            </Text>
            <Button title="Logout" onPress={handleLogout} />
        </SafeAreaView>
    )
}


export default Profile