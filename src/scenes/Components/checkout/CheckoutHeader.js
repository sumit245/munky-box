import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
const { width, height } = Dimensions.get('window')

export default class CheckoutHeader extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Text style={styles.checkoutText} >
                    <Text style={styles.checkoutText} >You are just a few clicks away from your{"\n"}</Text>
                    <Text style={styles.checkoutText}>Delicious Subscription!!!</Text>
                </Text>
                <View style={styles.fadingContainer}>
                    <Icon name="opencart" size={80} color="#f7a700" />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    checkoutText: {
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        color: '#274747'
    },
    fadingContainer: {
        paddingHorizontal: width / 3
    },
    header: {
        alignItems: 'baseline'
    },
})
