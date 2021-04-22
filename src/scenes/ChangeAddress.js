import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ManualEntry from './Components/manageaddress/ManualEntry';

const { width, height } = Dimensions.get('window')
export default class ChangeAddress extends Component {
  _addNewAddress = () => {
    console.log('Added')
  }
  render() {
    return (
      <View style={styles.container}>
        <ManualEntry />
        <TouchableOpacity style={styles.bottomview} onPress={this._addNewAddress}>
          <Text style={styles.confirmLocation} >Add New Address</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow:1
  },
  bottomview: {
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
})
