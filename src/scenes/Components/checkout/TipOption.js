import React, { Component } from 'react'
import { Text, View, TextInput } from 'react-native'
import { Checkbox } from 'react-native-paper'


export default class TipOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            tip: false,
            tip_amount: ""
        }
    }
    onValueChange = () => {
        this.setState(prevState => ({
            tip: !prevState.tip
        }));
    }
    onChangeText = (event) => {
        this.setState({ tip_amount: event })
    }

    render() {
        const { deliveryNotes, options } = this.props
        const { isSelected, tip, tip_amount } = this.state
        return (
            <>
                <View style={deliveryNotes}>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Text style={options} >Add a Tip</Text>
                        <Checkbox
                            status={tip ? 'checked' : 'unchecked'}
                            onPress={this.onValueChange}
                        />
                    </View>
                    <TextInput
                        style={{ borderBottomColor: "#99f", borderBottomWidth: 2, marginBottom: 4, fontSize: 16 }}
                        placeholder="$5.00 :)"
                        editable={tip}
                        onChangeText={this.onChangeText}
                        onEndEditing={() => this.props.tipHandler(tip_amount)}
                    />
                </View>

            </>
        )
    }
}
