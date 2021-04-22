import React, { useState, useContext } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FavouriteContext } from '../../../services/favourites/favourites.context'

export const Favourite = ({ restaurant, style, isHome }) => {
    const favourites = useContext(FavouriteContext)
    const [favourite, setfavourite] = useState(false)
    return (
        <TouchableOpacity style={styles.bookmark} onPress={() => setfavourite(!favourite)}>
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
