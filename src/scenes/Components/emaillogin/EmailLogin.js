import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';


const { width, height } = Dimensions.get('window');

export default class EmailLogin extends Component {
    render() {
        return (
            <>
                <TouchableOpacity style={{ top: -40 }}>
                    <Animated.View style={styles.buttonEmail}>
                        <Icon
                            name="email"
                            color="#4267B2"
                            size={26}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            Continue with Email
              </Text>
                    </Animated.View>
                </TouchableOpacity>

                
            </>
        )
    }
}
const styles = StyleSheet.create({
    buttonEmail: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 5,
    },
});