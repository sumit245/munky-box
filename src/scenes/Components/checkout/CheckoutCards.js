import axios from 'axios';
import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, TextInput, Modal, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Fontisto'
import { getCard, setCard } from '../../../services/cardHandler'

export default class CheckoutCards extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    cards = () => {
        getCard('@card').then(res => {
            this.setState({ cards: res })
        }).catch(err => {
            console.log(err)
        })
    }
    cardHandler = () => {
        Actions.push('cards', { title: "Select Card", checkout: true })
    }
    componentDidMount() {
        this.cards()
    }
    render() {
        const { optionrow, options } = this.props
        const { cards } = this.state
        return (
            <>
                {
                    cards === null ? (
                        <TouchableOpacity style={optionrow} onPress={this.cardHandler} >
                            <Text style={options} >Add a card</Text>
                            <Icon name="angle-right" color="#ccc" size={16} />
                        </TouchableOpacity>

                    ) : <Text>Payment Method</Text>
                }

            </>
        )
    }
}
