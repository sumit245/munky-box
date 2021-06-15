import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { setFavourite, updateFavourite, removeFavourite } from '../../../services/favourites/favouriteHandler'

export const Favourite = ({ isHome, restaurant }) => {
    const [favourite, setfavourite] = useState(false)
    const setfavretes = () => {
        // setFavourite('@favourite', restaurant)
        updateFavourite('@favourite', restaurant)
        // removeFavourite('@favourite')
        setfavourite(!favourite)
    }
    return (
        <TouchableOpacity style={styles.bookmark} onPress={setfavretes}>
            <Icon
                name={favourite && isHome ? "heart" : "heart-outline"}
                color={favourite && isHome ? "#f00" : "#ff7777"}
                size={30}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bookmark: {
        right: 10,
        position: 'absolute',
        height: 36,
        width: 36,
        borderRadius: 18,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
})
