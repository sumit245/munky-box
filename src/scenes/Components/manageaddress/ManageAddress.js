import React, { Component } from "react";
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
    Dimensions, ScrollView, KeyboardAvoidingView
} from "react-native";
import MaterialMapView from './MaterialMapView'
import ManualEntry from './ManualEntry'
import { setAddress } from '../../../services/addressHandler'
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { USER_URL } from "../../../services/EndPoints";

const { width, height } = Dimensions.get('window')
export default class ManageAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
    }
    _getData = (e) => {
        this.setState(e)
    }
    _confirmLocation = () => {
        let data = this.state;
        let address = {
            flat_num: data.flat_num,
            locality: data.locality,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code,
            country: data.country,
            address_type: data.address_type
        }
        let user = {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            email_id: data.email_id,
            address: address,
            status: "active"
        }
        console.log(user);
        axios.post(USER_URL, user).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        })
        setAddress('@address', JSON.stringify(address))
        Actions.replace('home', { ...this.state })
    }

    render() {
        return (
            <SafeAreaView style={{ flexGrow: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {this.props.title}
                    </Text>
                </View>
                <ScrollView style={styles.materialMapView} >
                    <KeyboardAvoidingView>
                        <MaterialMapView style={styles.materialMapView}></MaterialMapView>
                        <ManualEntry style={styles.materialCardWithoutImage} getData={this._getData} />
                    </KeyboardAvoidingView>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={this._confirmLocation} >
                    <Text style={styles.confirmLocation}>Confirm Location</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );

    }

}

const styles = StyleSheet.create({
    materialMapView: {
        width: width,
        height: width
    },
    materialCardWithoutImage: {
        height: width / 1.2,
        width: width,
    },
    button: {
        width: width - 5,
        alignSelf: 'center',
        borderRadius: 15,
        borderWidth: 1,
        paddingHorizontal: 5,
        height: 45,
        marginTop: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        position: 'absolute',
        bottom: 5
    },
    confirmLocation: {
        textAlign: "center",
        fontSize: 18,
        color: '#979797',
        marginLeft: 26
    },
    header: {
        height: 40,
        elevation: 2,
        borderBottomColor: '#cfcfcf',
        padding: 10,
        borderBottomWidth: 1,
        maxHeight: 80
    },
    headerText: {
        fontSize: 18
    },
});