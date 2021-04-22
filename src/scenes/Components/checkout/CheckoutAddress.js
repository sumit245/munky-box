import React, { Component } from 'react'
import axios from 'axios';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { getAddress, setAddress } from '../../../services/addressHandler'

export default class CheckoutAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    addresses = () => {
        getAddress('@address').then(res => {
            this.setState({ address: res })
        }).catch(err => console.log(err))
    }
    componentDidMount() {
        this.addresses()
    }
    render() {
        const { optionrow, options } = this.props
        const { address } = this.state
        console.log(address);
        return (
            <>
                {
                    address === null ? (
                        <TouchableOpacity style={optionrow}>
                            <Text style={options} >Add an address</Text>
                            <Icon name="angle-right" color="#ccc" size={16} />
                        </TouchableOpacity>

                    ) : (
                        <Text>Address Type</Text>
                    )
                }

            </>
        )
    }
}
