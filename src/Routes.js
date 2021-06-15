import React, { useState } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { View, TouchableOpacity } from 'react-native'
import AuthScene from './scenes/AuthScene';
import HomeScreen from './scenes/HomeScreen';
import ResultDetails from './scenes/ResultDetails';
import ReviewScreen from './scenes/ReviewScreen';
import PlanChooser from './scenes/PlanChooser';
import AddressPay from './scenes/AddressPay';
import ChangeAddress from './scenes/ChangeAddress';
import CheckOut from './scenes/Components/checkout/CheckOut';
import OrderHistory from './scenes/Components/OrderHistory';
import Policies from './scenes/Components/Policies';
import Rewards from './scenes/ReviewScreen';
import Icon from 'react-native-vector-icons/Ionicons'
import UserDetail from './scenes/Components/UserDetail';
import ManageAddress from './scenes/Components/manageaddress/ManageAddress'
import ManageCard from './scenes/Components/managecards/ManageCard'
import { ModalOpener } from './services/documentopener/documentopener';
import { getUser } from './services/user/getuser';

export default function Routes() {
    const [user, setUser] = useState({})
    const [login, setLogin] = useState(false)

    // getUser('@user').then((res) => {
    //     setLogin(true)
    //     console.log('user already');
    //     console.log(login);
    // }).catch((err) => {
    //     console.error(err)
    // })
    return (
        <Router>
            <Scene key="root">
                <Scene key="auth" component={AuthScene} hideNavBar={true} initial={true} />
                <Scene key="home" component={HomeScreen} hideNavBar={true} />
                <Scene key="userdetails" component={UserDetail} hideNavBar={true} />
                <Scene key="documents" component={ModalOpener} title={'Documents'} />
                <Scene key="reviews" component={ReviewScreen} title={'Reviews'} />
                <Scene key="planchooser" component={PlanChooser} />
                <Scene key="address" component={AddressPay} hideNavBar={true} />
                <Scene key="cards" component={ManageCard} />
                <Scene key="manageAddress" component={ManageAddress} hideNavBar={true} />
                <Scene key="changeaddress" component={ChangeAddress} title="Manage Address" />
                <Scene key="checkout" component={CheckOut} hideNavBar={true} />
                <Scene key="orderhistory" component={OrderHistory} title="Order History" />
                <Scene key="policies" component={Policies} title="About" />
                <Scene key="coupons" component={Rewards} hideNavBar={true} />
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
            </Scene>
        </Router>
    );
}
