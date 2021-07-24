import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Cuisine({ image, title }) {
    return (

        <View style={styles.cuisine}>
            <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
            <Text style={styles.cuisine_name}>{title}</Text>
        </View>
    )
}
