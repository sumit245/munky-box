import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'

export default class DeliveryNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery_notes: ""
        }
    }

    onChangeText = (event) => {
        this.setState({ delivery_notes: event })
    }
    render() {
        const { deliveryNotes, options } = this.props
        const { delivery_notes } = this.state
        return (
            <View style={deliveryNotes}>
                <Text style={options} >Add a Note</Text>
                <TextInput
                    style={{ borderBottomColor: "#99f", borderBottomWidth: 2, marginBottom: 4, fontSize: 16 }}
                    placeholder="Place the delivery at door"
                    onChangeText={this.onChangeText}
                    onEndEditing={() => this.props.noteHandler(delivery_notes)}
                />
            </View>
        )
    }
}
