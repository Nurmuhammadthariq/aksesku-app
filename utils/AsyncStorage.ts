import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (value: any) => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (error) {
        console.error('Error setting item:', error);
    }
}

export const getItem = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log(error);
    }
}