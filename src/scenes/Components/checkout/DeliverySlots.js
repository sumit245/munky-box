import axios from 'axios';
import React, { Component } from 'react'
import { Text, TouchableOpacity, ScrollView } from 'react-native'
const deliverySlots = [
    "12:00PM - 12:45PM",
    "12:45PM - 1:30PM",
    "1:30PM - 2:15PM"
]

export default class DeliverySlots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    onSlotChange = (data) => {
        this.setState(prevS => ({
            selected: !prevS.selected,
            slot: data
        }));

        this.props.slotHandler(data)

    }
    render() {
        const { options } = this.props
        const { selected } = this.state
        return (
            <>
                <Text style={[options, { color: '#333' }]}>Select a delivery slot</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        deliverySlots.map((data, key) => {
                            return (
                                <TouchableOpacity
                                    key={key}
                                    style={{ padding: 10, borderRadius: 4, borderWidth: 1, marginRight: 10, borderColor: selected ? "#228822" : "#777" }}
                                    onPress={() => this.onSlotChange(data)}
                                >
                                    <Text style={options}>{data}</Text>
                                </TouchableOpacity>

                            )
                        })

                    }
                </ScrollView>
            </>
        )
    }
}
