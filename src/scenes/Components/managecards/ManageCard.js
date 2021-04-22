import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { CreditCardInput } from "react-native-credit-card-input";
import { RadioButton } from 'react-native-paper/';
import Icon from 'react-native-vector-icons/Fontisto'

const { width, height } = Dimensions.get('window')
const cards = [
    {
        card_icon: "credit-card",
        number: 4242,
        name: "Sumit",
        expiry: "04/23",
        cvc: "300"
    },
    {
        card_icon: "credit-card",
        number: 4242,
        name: "Sumit",
        expiry: "04/23",
        cvc: "300"
    },

]
export default class ManageCard extends Component {
    _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.body} >
                    {
                        cards.map((data, key) => {
                            return (
                                <View style={styles.optionrow}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <RadioButton />
                                        <View>
                                            <Text style={{ fontSize: 14 }} >{data.number}</Text>
                                            <Text style={{ fontSize: 12, color: "#777" }} >{data.expiry}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => console.log('Deleted')} >
                                        <Icon name="trash" size={20} color="#cc6666" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }


                </View>
                <CreditCardInput
                    autoFocus
                    requiresName
                    requiresCVC
                    cardScale={1.0}
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    validColor={"#228822"}
                    invalidColor={"#aa2222"}
                    placeholderColor={"darkgray"}
                    onFocus={this._onFocus}
                    onChange={this._onChange} />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.checkout}>
                        <Icon name="credit-card" size={28} color="#FFF" />
                        <Text style={styles.btnText}>Add card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    body: {
        padding: 10,
        overflow: 'scroll',
        marginBottom: 50
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 1
    },
    checkout: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#df7070',
        padding: 6,
        width: width - 4,
        marginHorizontal: 2,
        borderRadius: 5
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    optionrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        shadowOffset: {
            height: 1,
            width: 1
        },
        shadowOpacity: 0.5,
        shadowColor: '#999',
        shadowRadius: 5,
        marginVertical: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
    }
})
