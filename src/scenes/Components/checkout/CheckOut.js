import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import CheckoutHeader from './CheckoutHeader';
import CheckoutAddress from './CheckoutAddress';
import CheckoutCards from './CheckoutCards';
import PlanDuration from './PlanDuration';
import DeliverySlots from './DeliverySlots';
import PromoOptions from './PromoOptions';
import BillingTable from './BillingTable';
import TipOption from './TipOption';
import DeliveryNotes from './DeliveryNotes';
import { getUser } from '../../../services/user/getuser';
import axios from 'axios';
import { ORDER_URL } from '../../../services/EndPoints';
import { ToastAndroid } from 'react-native';
const { width, height } = Dimensions.get('window')

export default class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      selectedStartDate: null,
      modalVisible: false,
      discount: 0,
      tip: 0
    };
  }
  dateHandler = (startDate, endDate) => {
    this.setState({ start_date: startDate, end_date: endDate })
  }
  couponHandler = (promo, discount) => {
    this.setState({
      promo_code: promo,
      discount: discount
    })
  }
  noteHandler = (notes) => {
    console.log(notes);
    this.setState({ notes: notes })
  }
  tipHandler = (tip_amount) => {
    this.setState({ tip: tip_amount })
  }
  slotHandler = (delivery_slot) => {
    this.setState({ time: delivery_slot })
  }
  cardHandler = (card) => {
    this.setState({ cards: card })
  }
  addressHandler = (address) => {
    this.setState({ address: address })
  }
  totalHandler = (total) => {
    this.setState({ total: total })
  }
  orderNow = () => {
    const { restaurant, total, user, plan, price, start_date, end_date, notes, time, tip, discount, address } = this.state;
    let currenttime = new Date()
    currenttime = currenttime.toLocaleDateString() + " " + currenttime.toLocaleTimeString()
    console.log(currenttime);
    const newOrder = {
      order_time: currenttime,
      status: "pending",
      user,
      address,
      restaurant,
      time,
      plan,
      price,
      discount,
      total,
      tip,
      start_date,
      end_date,
      notes,
    }
    axios.post(ORDER_URL, newOrder).then(res => {
      ToastAndroid.show("Order Successfully Placed", 1000)
    }).catch(err => {
      alert(err)
    })
  }
  componentDidMount() {
    getUser('@user').then(res => (
      res === null ? alert("Please login or register to proceed") : null,
      this.setState({ user: res })
    )).catch((err) => console.log(err))
  }

  render() {
    const { plan, restaurant, price, discount, tip } = this.state
    return (
      <View style={styles.container} >
        <CheckoutHeader />
        <ScrollView style={styles.body}>
          <Text style={styles.welcomeText} >Welcome from {restaurant} </Text>
          <Text style={styles.mealText}>You are subscribing for
            {
              plan === "thirtyPlan" ? " 30 Days" : plan === "fifteenPlan" ? " 15 Days" : plan === "twoPlan" ? " 2 Days" : "..."
            }
          </Text>
          <CheckoutAddress optionrow={styles.optionrow} options={styles.options} addressHandler={this.addressHandler} />
          <CheckoutCards optionrow={styles.optionrow} options={styles.options} cardHandler={this.cardHandler} />
          <PlanDuration optionrow={styles.optionrow} options={styles.options} plan={plan} dateHandler={this.dateHandler} />
          <DeliverySlots options={styles.options} slotHandler={this.slotHandler} />
          <PromoOptions options={styles.options} couponHandler={this.couponHandler} />
          <BillingTable price={price} discount={discount} tip={tip} totalHandler={this.totalHandler} />
          <TipOption deliveryNotes={styles.deliveryNotes} options={styles.options} tipHandler={this.tipHandler} />
          <DeliveryNotes deliveryNotes={styles.deliveryNotes} options={styles.options} noteHandler={this.noteHandler} />
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.checkout} onPress={this.orderNow} >
            <Icon name="opencart" size={28} color="#FFF" />
            <Text style={styles.btnText}>Complete your Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 0.5,
    shadowColor: '#999',
    shadowRadius: 5,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  deliveryNotes: {
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 0.5,
    shadowColor: '#999',
    paddingHorizontal: 10,
    shadowRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
  },
  options: {
    fontSize: 18,
    color: "#777",
    textTransform: "capitalize"
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 1
  },
  checkout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#df7070',
    padding: 6,
    width: width - 4,
    marginHorizontal: 2,
    borderRadius: 5
  },
  btnText: {
    fontSize: 16,
    color: '#fff'
  },
  body: {
    padding: 10,
    overflow: 'scroll',
    marginBottom: 50
  },
  welcomeText: {
    fontSize: 18,
    color: "#5aaa",
    fontWeight: 'bold',
    padding: 2
  },
  mealText: {
    fontSize: 16,
    color: "#ccc",
    padding: 2
  }
})