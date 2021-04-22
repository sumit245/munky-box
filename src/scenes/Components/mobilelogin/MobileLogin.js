import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import {
    TouchableOpacity,
} from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import firebase from '../../../firebase'
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import OTPTextView from 'react-native-otp-textinput'
import { Actions } from 'react-native-router-flux';
import CountDown from 'react-native-countdown-component';
import axios from 'axios';

const { width } = Dimensions.get('window');
const recaptchaVerifier = React.createRef();
const attemptInvisibleVerification = true;
const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

class OTPLogin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            verificationCode: "",
        }
    }
    clear = () => {
        this.input1.clear();
    };
    _signIn = async () => {
        const { verificationCode, verificationId, phoneNumber } = this.state
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
            let newUser = {
                phone: phoneNumber
            }
            // axios.post('http://192.168.1.4/api/users', newUser).then((res) => res.status(200, 'Added')).catch((err) => {
            //     console.log(err)
            // }) ******Write code to put in database and login persistency
            Actions.replace('userdetails', { logintype: 'mobile' })
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }
    render() {
        const { message, phoneNumber, verificationCode, verificationId } = this.state
        return (
            <View style={styles.mobin}>
                <Text style={styles.instructions}>{message || ""} {phoneNumber || ""}</Text>
                <View>
                    <OTPTextView
                        ref={(e) => (this.input1 = e)}
                        handleTextChange={(text) => this.setState({ verificationCode: text })}
                        containerStyle={styles.textInputContainer}
                        textInputStyle={styles.roundedTextInput}
                        inputCount={6}
                        inputCellLength={1}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.instructions} >OTP valid for</Text>
                    <View>
                        <CountDown
                            size={14}
                            until={60}
                            digitStyle={{ marginLeft: -1, marginTop: -7, paddingHorizontal: 0, marginHorizontal: 0 }}
                            timeLabelStyle={{ fontWeight: 'normal' }}
                            digitTxtStyle={{ color: '#194350' }}
                            timeLabels={{ s: null }}
                            separatorStyle={{ color: '#194350', marginTop: -10, marginLeft: -4, marginRight: -4 }}
                            showSeparator
                            onFinish={() => {
                                alert('Try again after some time!!!')
                            }}
                            timeToShow={['M', 'S']}
                        />
                    </View>
                    <Text style={{ color: '#194350', marginLeft: -4, fontSize: 12, marginTop: 3 }} >S</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={[styles.btnOTP, { width: width / 2.5, height: 40, marginHorizontal: 10 }]} onPress={this.clear} ><Text>Clear</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.btnOTP, { width: width / 2.5, height: 40, marginHorizontal: 10 }]} onPress={this._signIn} ><Text>Submit</Text></TouchableOpacity>
                </View>
            </View>
        );

    }

}

export default class MobileLogin extends Component {
    state = {
        phoneNumber: '',
        verificationId: "",
        verificationCode: ""
    }
    _sendVerificationCode = async () => {
        const { phoneNumber } = this.state;
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            this.setState({ verificationId: verificationId, message: "Verification code has been sent to your phone." })
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }
    }
    render() {
        const { phoneNumber, verificationId, message } = this.state
        return (
            <>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    attemptInvisibleVerification={attemptInvisibleVerification}
                />

                {
                    !verificationId ? (
                        <View style={styles.mobin}>
                            <PhoneInput
                                placeholder="Enter Mobile Number"
                                defaultCode="CA"
                                containerStyle={{ width: width - 40, borderRadius: 8, borderColor: 'black', borderWidth: 1, backgroundColor: '#fff' }}
                                onChangeFormattedText={phoneNumber => this.setState({ phoneNumber: phoneNumber })}
                            />
                            <TouchableOpacity onPress={this._sendVerificationCode} disabled={!phoneNumber} >
                                <Animated.View
                                    style={styles.btnOTP}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        Send OTP
              </Text>
                                </Animated.View>
                            </TouchableOpacity>
                        </View>

                    ) : (<OTPLogin verificationId={verificationId} phoneNumber={phoneNumber} message={message} />)
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    btnOTP: {
        height: 50,
        width: width - 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    mobin: {
        justifyContent: 'center',
        alignItems: 'center',
        top: -80
    },
    instructions: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333333',
        marginBottom: 10
    },
    textInputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    roundedTextInput: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
});