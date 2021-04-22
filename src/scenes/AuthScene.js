import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { StatusBar } from 'react-native';

import MobileLogin from './Components/mobilelogin/MobileLogin';
import EmailLogin from './Components/emaillogin/EmailLogin';
import FBLogin from './Components/facebooklogin/FBLogin';
import GoogLogin from './Components/googlelogin/GoogLogin';
import Logo from './Components/Logo';

const { width, height } = Dimensions.get('window');
class AuthScene extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    phoneNumber: '',
    verificationId: '',
    verificationCode: '',
    message: ''
  }
  render() {
    return (
      <>
        <StatusBar />
        <View
          style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Animated.View style={styles.skip}>
            <TouchableOpacity onPress={() => Actions.replace('userdetails',{logintype:''})}>
              <Text style={{ fontSize: 16}}>
                Skip{' '}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Logo />
          <MobileLogin />
          <View
            style={{
              borderBottomColor: '#777',
              borderBottomWidth: 1,
              top: -60,
              width: width - 40,
              justifyContent: 'center',
              alignSelf: 'center'

            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#777',
                textAlign: 'center',
              }}>
              OR
            </Text>
          </View>
          <EmailLogin />

          <View style={styles.social}>
            <FBLogin />
            <GoogLogin />
          </View>
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 5,
              justifyContent: 'flex-end',
            }}>
            By Continuing,you agree to our terms and conditions{' '}
          </Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 5,
    top: -40
  },
  skip: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
});

export default AuthScene;
