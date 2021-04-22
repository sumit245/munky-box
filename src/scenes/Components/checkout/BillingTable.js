import axios from 'axios';
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { CHECKOUT_URL } from '../../../services/EndPoints'
import { getAddress, setAddress } from '../../../services/addressHandler'
import { getCard, setCard } from '../../../services/cardHandler'
import { Checkbox } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import CheckoutHeader from './CheckoutHeader';
import CheckoutAddress from './CheckoutAddress';
import CheckoutCards from './CheckoutCards';
import PlanDuration from './PlanDuration';
import DeliverySlots from './DeliverySlots';
import PromoOptions from './PromoOptions';
const { width, height } = Dimensions.get('window')

export default class BillingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
        }
    }

    componentDidMount() {
        axios.get(CHECKOUT_URL).then(res => {
            let checks = res.data
            let total = parseFloat(this.state.price) + parseFloat(checks.delivery_fee) + parseFloat(checks.service_fee) + parseFloat(checks.taxes)
            total = total.toFixed(2)
            this.setState({ checks: checks, total: total })
        }).catch(err => {
            console.error(err)
        })
    }
    render() {
        const { plan, restaurant, price, checks, total, address, cards, modalVisible } = this.state
        return (
            <>
                <View style={styles.billingTable}>
                    {
                        checks ? (
                            <>
                                <View style={styles.row}>
                                    <Text style={styles.rowContent}>Subtotal</Text>
                                    <Text style={styles.rowContent}>${price}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.rowContent}>Delivery Fee</Text>
                                    <Text style={styles.rowContent}>${checks.delivery_fee}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.rowContent}>Service Fee</Text>
                                    <Text style={styles.rowContent}>${checks.service_fee}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.rowContent}>Taxes</Text>
                                    <Text style={styles.rowContent}>${checks.taxes}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.rowContent}>Total</Text>
                                    <Text style={styles.rowContent}>${total}</Text>
                                </View>
                            </>
                        ) : null
                    }
                </View>


            </>
        )
    }
}

const styles = StyleSheet.create({
    billingTable: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#ccc",
        marginVertical: 6
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 4
    },
    rowContent: {
        fontSize: 18,
        color: '#8c8c8c'
    }
})
