import React, { Component } from 'react';
import { Actions, Modal, Router, Scene } from 'react-native-router-flux';
import { View, TouchableOpacity } from 'react-native'
import LoadingScene from './src/scenes/LoadingScene';
import AuthScene from './src/scenes/AuthScene';
import HomeScreen from './src/scenes/HomeScreen';
import { LogBox } from 'react-native';
import ResultDetails from './src/scenes/ResultDetails';
import ReviewScreen from './src/scenes/ReviewScreen';
import PlanChooser from './src/scenes/PlanChooser';
import AddressPay from './src/scenes/AddressPay';
import ChangeAddress from './src/scenes/ChangeAddress';
import CheckOut from './src/scenes/Components/checkout/CheckOut';
import OrderHistory from './src/scenes/Components/OrderHistory';
import Policies from './src/scenes/Components/Policies';
import Rewards from './src/scenes/ReviewScreen';
import Icon from 'react-native-vector-icons/Ionicons'
import UserDetail from './src/scenes/Components/UserDetail';
import ManageAddress from './src/scenes/Components/manageaddress/ManageAddress'
import ManageCard from './src/scenes/Components/managecards/ManageCard'
import { showModal, ModalOpener } from './src/services/documentopener/documentopener';

class App extends Component {
  componentDidMount() {
    LogBox.ignoreLogs(['Animated : `useNativeDriver` ']);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="loading"
            component={LoadingScene}
            initial={true}
            hideNavBar={true}></Scene>
          <Scene key="auth" component={AuthScene} hideNavBar={true}></Scene>
          <Scene key="home" component={HomeScreen} hideNavBar={true}></Scene>
          <Scene key="userdetails" component={UserDetail} hideNavBar={true}></Scene>
          <Scene
            key="details"
            component={ResultDetails}
            renderRightButton={() => (
              <View style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                <TouchableOpacity onPress={() => { Actions.push('documents') }} >
                  <Icon name='images-outline' size={24} style={{ margin: 2, marginRight: 5 }} />
                </TouchableOpacity>
              </View>
            )} />
          <Scene key="documents" component={ModalOpener} title={'Documents'} ></Scene>
          <Scene key="reviews" component={ReviewScreen} title={'Reviews'} ></Scene>
          <Scene key="planchooser" component={PlanChooser}></Scene>
          <Scene key="address" component={AddressPay} hideNavBar={true}></Scene>
          <Scene key="cards" component={ManageCard}></Scene>
          <Scene key="manageAddress" component={ManageAddress} hideNavBar={true}></Scene>
          <Scene
            key="changeaddress"
            component={ChangeAddress}
            title="Manage Address"></Scene>
          <Scene key="checkout" component={CheckOut} hideNavBar={true}></Scene>
          <Scene
            key="orderhistory"
            component={OrderHistory}
            title="Order History"></Scene>
          <Scene key="policies" component={Policies} title="About"></Scene>
          <Scene key="coupons" component={Rewards} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}

export default App;
