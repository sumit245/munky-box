import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Switch} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NotificationStack extends Component {
  state = {isSwitchOn: false};
  onToggleSwitch = () => this.setState({isSwitchOn: true});
  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-back-outline" size={32} />
          </TouchableOpacity>
          <Text style={styles.appHeader}>Notification Preferences</Text>
        </View>

        <View style={styles.container}>
          <Card style={styles.notifCard}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 22,
                  paddingTop: 8,
                  fontWeight: 'bold',
                }}>
                Push Notifications
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#525',
                  marginLeft: 80,
                  margin: 10,
                  borderRadius: 4,
                  paddingHorizontal: 10,
                //   paddingVertical: 2,
                }}>
                <Text style={{fontSize: 18, color: '#fff'}}>OFF</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 20,
                // paddingBottom: 5,
                color: '#555',
                
              }}>
              Tap to enable notifications
            </Text>
          </Card>
          <Card style={{marginTop: 2}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 20,
                  paddingHorizontal: 20,
                  paddingTop: 4,
                  fontWeight: 'bold',
                  color: '#585828',
                }}>
                Enable All
              </Text>
              <Switch
                style={{
                  transform: [{scaleX: 1.3}, {scaleY: 1.2}],
                  marginLeft: 160,
                }}
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 20,
                paddingBottom: 5,
                color: '#555',
              }}>
              Tap to receive all notifications
            </Text>
          </Card>
          <Card style={{marginTop: 2}}>
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 20,
                paddingTop:4,
                fontWeight: 'bold',
                color: '#585828',
              }}>
              Promos and Offers
            </Text>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 20,
                paddingBottom: 5,
                color: '#555',
              }}>
              Receive coupons, promotions and money-saving offers
            </Text>

            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <Icon
                name="notifications-outline"
                size={28}
                style={{paddingHorizontal: 20}}
              />
              <Text style={{fontSize: 20}}>Push</Text>
              <Switch
                style={{
                  transform: [{scaleX: 1.3}, {scaleY: 1.2}],
                  marginLeft: 180,
                }}
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
          <Card style={{marginTop: 2}}>
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 20,
                paddingTop: 4,
                fontWeight: 'bold',
                color: '#585828',
              }}>
              Orders and Purchases
            </Text>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 20,
                paddingBottom: 5,
                color: '#555',
              }}>
              Receive updates related to your order status, memberships, table
              bookings and more
            </Text>

            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <Icon
                name="notifications-outline"
                size={28}
                style={{paddingHorizontal: 20}}
              />
              <Text style={{fontSize: 20}}>Push</Text>

              <Switch
                style={{
                  transform: [{scaleX: 1.3}, {scaleY: 1.3}],
                  marginLeft: 180,
                }}
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
          <Card style={{marginTop: 2}}>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 20,
                paddingTop: 4,
                color: '#585828',
              }}>
              Stay Tuned!!! Get Notified right in your Mailbox
            </Text>
            <View style={{flexDirection: 'row',paddingVertical:5}}>
              <Icon
                name="mail-outline"
                size={26}
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 5,
                  color: '#555',
                }}
              />
              <Switch
                style={{
                  transform: [{scaleX: 1.3}, {scaleY: 1.2}],
                  marginLeft: 230,
                }}
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
          <Card style={{marginTop: 2}}>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 20,
                paddingTop: 4,
                color: '#585828',
              }}>
              Don't open your mailbox frequently??? Get quick Message in your phone
            </Text>
            <View style={{flexDirection: 'row',paddingVertical:5}}>
              <Icon
                name="call-outline"
                size={26}
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 5,
                  color: '#555',
                }}
              />
              <Switch
                style={{
                  transform: [{scaleX: 1.3}, {scaleY: 1.2}],
                  marginLeft: 230,
                }}
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    top: 0,
    flexDirection: 'row',
    height: 50,
    elevation: 2,
    padding: 10,
    borderBottomColor: '#ddd',
  },
  appHeader: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 30,
    fontSize: 24,
  },
  container: {
    backgroundColor: '#555',
    overflow:'scroll'
  },
  notifCard: {
    height: 80,
  },
});
