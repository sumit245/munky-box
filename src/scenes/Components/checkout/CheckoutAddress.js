import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { getAddress, removeAddress } from '../../../services/addressHandler'
import { Actions } from 'react-native-router-flux';

export default class CheckoutAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: {},
            selected: false,
        }
    }
    _nextAction = () => {
        Actions.push('changeaddress', { title: "Select Address", checkout: true, type: "edit" })
    }
    addresses = () => {
        getAddress('@address').then(res => {
            this.setState({ address: res })
        }).catch(err => console.log(err))
    }
    componentDidMount() {
        this.addresses()
    }
    deleteHandler = () => {
        Alert.alert(
            "Delete",
            "Are you Sure",
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "OK", onPress: () => {
                    removeAddress('@address')
                }
            }
            ]
        )
    }
    shouldComponentUpdate(prevProps, nexProps) {
        return true
    }
    componentDidUpdate(prevProps) {
        if (prevProps.address !== this.props.address) {
            this.setState({
                address: this.props.address
            })
        }
    }
    handleSelector = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
        if (this.state.selected === false) {
            this.props.addressHandler(this.state.address)
        }
    }
    render() {
        const { optionrow, options } = this.props
        const { address, selected } = this.state
        return (
            <>
                {
                    address === null ? (
                        <TouchableOpacity style={optionrow} onPress={this._nextAction}>
                            <Text style={options} >Add an address</Text>
                            <Icon name="angle-right" color="#ccc" size={16} />
                        </TouchableOpacity>

                    ) : (
                        <View style={optionrow}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={options}>{address.address_type}</Text>
                                    <Icon name={address.address_type === "home" ? "home"
                                        : address.address_type === "office" ? "table-1" : "info"}
                                        color="#ccc" size={18} />
                                    <Text onPress={() => Actions.push('changeaddress', { type: 'edit' })} style={styles.hyperlink}>Edit</Text>
                                </View>
                                <View style={{ flexDirection: "row", width: 100 }}>
                                    {
                                        Object.values(address).map((data, key) => {
                                            return (
                                                <Text style={{ paddingHorizontal: 1 }} >{data}</Text>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={styles.rightContainer} >
                                <TouchableOpacity style={styles.buttons} onPress={this.deleteHandler} >
                                    <Icon name="trash" color="red" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons} onPress={this.handleSelector} >
                                    <Icon name={selected ? "radio-btn-active" : "radio-btn-passive"} color={selected ? "#22cc73" : "#53aa84"} size={18} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </>
        )
    }
}
const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1
    },
    buttons: {
        height: 24,
        width: 24,
        padding: 1,
        margin: 2,
        justifyContent: 'center'
    },
    hyperlink: {
        color: "#245399",
        textAlign: "right",
        textDecorationStyle: "solid"
    }
})
