import AsyncStorage from '@react-native-community/async-storage';

export const setFavourite = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};
