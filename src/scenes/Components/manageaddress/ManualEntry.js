import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

export default class ManualEntry extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props }
    }
    onChangeText = id => e => {
        const data = { [id]: e }
        this.setState({
            [id]: e
        })
        this.props.getData(data)
    }
    selectChip = id => (e) => {
        let data = {
            "address_type": id
        }
        this.setState({ 'address_type': id })
        this.props.getData(data)
    }

    render() {
        const { style, address_type } = this.state;
        return (
            <View style={[styles.container, style]}>
                <View style={styles.bodyContent}>
                    <Text style={styles.selectAddress}>Select Address</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <View style={styles.inputContainer}>
                        <Icon name="business-outline" size={18} color="rgba(155,155,155,1)" />
                        <TextInput
                            onChangeText={this.onChangeText('flat_num')}
                            placeholder="Flat No."

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="ios-map-outline" size={18} color="rgba(155,155,155,1)" />
                        <TextInput
                            onChangeText={this.onChangeText('locality')}
                            placeholder="Street"

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="location-outline" size={18} color="rgba(155,155,155,1)" />
                        <TextInput
                            onChangeText={this.onChangeText('city')}
                            placeholder="City"

                        />
                    </View>


                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <View style={styles.inputContainer}>
                        <Icon name="business-outline" size={18} color="rgba(155,155,155,1)" />
                        <TextInput
                            onChangeText={this.onChangeText('state')}
                            placeholder="State"

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="ios-map-outline" size={18} color="rgba(155,155,155,1)" />
                        <TextInput
                            onChangeText={this.onChangeText('country')}
                            placeholder="Country"

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="location-outline" size={18} color="rgba(155,155,155,1)" />
                        <TextInput
                            onChangeText={this.onChangeText('postal_code')}
                            placeholder="Postal Code"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                    <Chip icon="information" selected={address_type === 'home' ? true : false} mode="outlined" onPress={this.selectChip('home')}>Home</Chip>
                    <Chip icon="information" selected={address_type === 'work' ? true : false} mode="outlined" onPress={this.selectChip('work')}>Work</Chip>
                    <Chip icon="information" selected={address_type === 'other' ? true : false} mode="outlined" onPress={this.selectChip('other')}>Others</Chip>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#CCC",
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: -1,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
        overflow: "hidden"
    },
    bodyContent: {
        padding: 1,
        paddingTop: 2,
        justifyContent: "center"
    },
    chips: {
        elevation: 2,
        borderColor: '#777'

    },
    selectAddress: {
        fontSize: 16,
        color: "#000",
        padding: 5
    },
    inputContainer: {
        flexDirection: 'row',
        paddingHorizontal: 2,
        alignItems: 'baseline',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(155,155,155,1)",
        width: 100

    }
});
