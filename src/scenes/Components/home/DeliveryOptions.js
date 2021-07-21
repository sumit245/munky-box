import React, { Component } from 'react'
import { View, TouchableOpacity, Modal, StyleSheet, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { getAddress } from '../../../services/addressHandler'

export default class DeliveryOptions extends Component {
    state = {
        modalVisible: false,
        address: "Choose Delivery Address",
        addresses: {}
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    setAddress = (address) => {
        this.setState({ address: address, modalVisible: false })
    }
    componentDidMount() {
        getAddress('@address').then(res => {
            this.setState({ addresses: res })
        }).catch(err =>
            console.error(err)
        )
    }

    render() {
        const { modalVisible, addresses } = this.state;
        console.log(modalVisible);
        return (
            <>
                <View style={styles.sortView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.sortView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.buttonClose}
                                    onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                    <Icon name="close-outline" size={20} />
                                </TouchableOpacity>
                                <View>
                                    {
                                        addresses && Object.keys(addresses).length !== 0 ? (<TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: '#979797', borderBottomWidth: 1 }} onPress={() => { this.setAddress('Home') }} >
                                            <Icon name="ios-home-outline" size={16} style={styles.modalText} />
                                            <Text style={styles.modalText}>{addresses.address_type}</Text>
                                        </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={{ flexDirection: 'row', borderBottomColor: '#979797', borderBottomWidth: 1 }}>
                                                <Icon name="ios-location-outline" size={16} style={styles.modalText} />
                                                <Text style={styles.modalText}>Choose Current Location</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.setModalVisible(true)} >
                            <Text style={{ fontSize: 16 }}>DELIVER TO</Text>
                            <Icon name="chevron-down-outline" size={20} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#979797',
                        top: -8
                    }}>
                        {this.state.address}
                    </Text>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    sortView: {
        flex: 1,
        position: 'absolute',
        top: 20,
        width: 220,
        left: 4,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        elevation: 10,
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        top: -10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalText: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        color: '#979797',
        paddingVertical: 10,
        textAlign: "justify",
    }
});
