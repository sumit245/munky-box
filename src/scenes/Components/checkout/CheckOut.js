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
const { width, height } = Dimensions.get('window')

export default class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      selectedStartDate: null,
      modalVisible: false
    };
  }
  dateHandler = (startDate, endDate) => {
    console.log("Plan Starts from", startDate)
    console.log("Plan ends at", endDate)
  }
  couponHandler = (promo, discount) => {
    console.log(promo, discount);
  }
  noteHandler = (notes) => {
    console.log("Notes", notes)
  }
  tipHandler = (tip_amount) => {
    console.log('Tip amount is', tip_amount)
  }
  slotHandler = (delivery_slot) => {
    console.log(('TIming', delivery_slot));
  }

  render() {
    const { plan, restaurant, price } = this.state
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
          <CheckoutAddress optionrow={styles.optionrow} options={styles.options} />
          <CheckoutCards optionrow={styles.optionrow} options={styles.options} />
          <PlanDuration optionrow={styles.optionrow} options={styles.options} plan={plan} dateHandler={this.dateHandler} />
          <DeliverySlots options={styles.options} slotHandler={this.slotHandler} />
          <PromoOptions options={styles.options} couponHandler={this.couponHandler} />
          <BillingTable price={price} />
          <TipOption deliveryNotes={styles.deliveryNotes} options={styles.options} tipHandler={this.tipHandler} />
          <DeliveryNotes deliveryNotes={styles.deliveryNotes} options={styles.options} noteHandler={this.noteHandler} />
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.checkout}>
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
    color: "#777"
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