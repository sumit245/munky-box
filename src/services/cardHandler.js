import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCard = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

export const setCard = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};


