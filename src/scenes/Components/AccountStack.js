import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/Ionicons';
import { clearAll, getUser, removeUser } from '../../services/user/getuser';

export default class AccountStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      user: {}
    }
  }

  componentDidMount() {
    getUser('@user').then(res => (
      this.setState({ user: res })
    )).catch((err) => console.log(err))
  }
  logout = () => {
    removeUser('@user').then(res => {
      clearAll().then(
        alert('Logged out')
      )
    }).catch((err) => {
      alert(err)
    })
  }

  render() {
    const data = { ...this.state.user }
    const user = data.first_name + " " + data.last_name
    return (
      <Animated.View style={styles.navdrawer}>
        <View style={styles.header}>
          <View style={styles.imageNUmName}>
            <TouchableHighlight style={styles.profileContainer}>
              <Image
                source={{ uri: data.uri }}
                style={styles.profilepic}
              />
            </TouchableHighlight>
            <View style={{ marginLeft: 2, marginTop: 5 }}>
              <Text style={{ fontSize: 14, color: '#777' }}>
                {data.phone || "Add Mobile Number"}
              </Text>
              <Text style={{ fontSize: 14, color: '#777' }}>
                {user || "User"}
              </Text>
              <Text style={{ fontSize: 14, color: '#777' }}>
                {data.email_id || "Add new email"}
              </Text>
              <TouchableOpacity onPress={() => Actions.push('userdetails', { type: 'edit' })} >
                <Text
                  style={{ marginLeft: 5, color: "#246eff", }}>
                  Edit Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
          </View>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="ios-cash-outline" color={"#55aeff"} size={24} brand />
          <TouchableOpacity onPress={() => { Actions.push('coupons') }}>
            <Text style={styles.drawerText}>Add Coupons</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="earth" color={"#55aeff"} size={24} brand />
          <TouchableOpacity onPress={() => { Actions.push('changeaddress') }}>
            <Text style={styles.drawerText}>Manage Address</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="ios-receipt-outline" color={"#55aeff"} size={24} brand />
          <Text style={styles.drawerText}>Bill Notifications</Text>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="md-card-outline" color={"#55aeff"} size={24} />
          <TouchableOpacity
            onPress={() => { Actions.push('cards', { title: 'Payment Methods', checkout: false }) }}
          >
            <Text style={styles.drawerText}>Payment Methods</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="timer-outline" color={"#55aeff"} size={24} brand />
          <TouchableOpacity onPress={() => { Actions.push('orderhistory') }}>
            <Text style={styles.drawerText}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="cog-outline" color={"#55aeff"} size={24} brand />
          <Text style={styles.drawerText}>Settings</Text>
        </View>
        <View style={styles.drawerRow}>
          <Icons name="md-document-text-outline" color={"#55aeff"} size={24} brand />
          <TouchableOpacity onPress={() => { Actions.push('policies') }}>
            <Text style={styles.drawerText}>Policies</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.logout} style={[styles.drawerRow, { position: 'absolute', bottom: 0 }]}>
          <Icons name="exit-outline" color={"#55aeff"} size={24} brand />
          <Text style={styles.drawerText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  navdrawer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignContent: 'flex-start',
    right: 0,
    borderWidth: 0.2,
    elevation: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'red',
    width: 250,
    zIndex: 1,
    overflow: 'scroll'
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    height: 100,
    top: 0,
    elevation: 1,
    padding: 10,
  },
  drawerRow: {
    borderBottomColor: '#bbb',
    marginHorizontal: 5,
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    flexDirection: 'row',
    padding: 5,
    marginVertical: 1,
  },
  drawerText: {
    marginLeft: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#55aeff",
  },
  profileContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profilepic: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageNUmName: {
    flex: 1,
    flexDirection: 'row',
  },
});
