import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({ plan, restaurant }) => {
  let rest = restaurant;
  const getPlan = (data, price, rest) => {
    console.log(restaurant);
    Actions.push('checkout', { restaurant: restaurant, price: price, plan: data })
  };
  return (
    <>
      <Card style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ position: 'absolute', left: 10 }}>
            <Text
              style={{
                color: '#b2c2c2',
                fontWeight: 'bold',
              }}>
              ${plan.twoPlan.customer_2price}
            </Text>

            <Text
              style={{ color: '#b2c2c2', fontWeight: 'bold' }}>
              2 Days
        </Text>
          </View>
          <View style={{ position: 'absolute', right: 10 }}>
            <TouchableOpacity
              onPress={() => getPlan('twoPlan', plan.twoPlan.customer_2price)}
              style={styles.selectoffer}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                CHOOSE
          </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      <Card style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ position: 'absolute', left: 10 }}>
            <Text
              style={{
                color: '#b2c2c2',
                fontWeight: 'bold',
              }}>
              ${plan.fifteenPlan.customer_15price}
            </Text>

            <Text
              style={{ color: '#b2c2c2', fontWeight: 'bold' }}>
              15 Days
        </Text>
          </View>
          <View style={{ position: 'absolute', right: 10 }}>
            <TouchableOpacity
              onPress={() => getPlan('fifteenPlan', plan.fifteenPlan.customer_15price)}
              style={styles.selectoffer}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                CHOOSE
          </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
      <Card style={styles.item}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ position: 'absolute', left: 10 }}>
            <Text
              style={{
                color: '#b2c2c2',
                fontWeight: 'bold',
              }}>
              ${plan.thirtyPlan.customer_30price}
            </Text>

            <Text
              style={{ color: '#b2c2c2', fontWeight: 'bold' }}>
              30 Days
        </Text>
          </View>
          <View style={{ position: 'absolute', right: 10 }}>
            <TouchableOpacity
              onPress={() => getPlan('thirtyPlan', plan.thirtyPlan.customer_30price)}
              style={styles.selectoffer}>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#ffffff' }}>
                CHOOSE
          </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  )
}

export default class PlanChooser extends Component {
  render() {
    const { plan, restaurant } = this.props
    return (
      <SafeAreaView style={{ backgroundColor: '#fffeff' }}>
        <Text style={styles.header}>Best Flexible Plan For You</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: '#fffeff' }}>
          <Card style={styles.optioncard}>
            <Card.Content>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="swap-horizontal" size={30} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 10 }}>SWAP MEAL</Text>
              </View>
              <Paragraph style={styles.cardcontent}>
                In Hurry? Swap upcoming meal with any other
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.optioncard}>
            <Card.Content>
              <View style={{ flexDirection: 'row' }} >
                <Icon name="infinite-outline" size={30} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 10 }}>SKIP MEAL</Text>
              </View>
              <Paragraph style={styles.cardcontent}>
                Sudden Change In Plan? Now you can skip 3 meals in monthly
                subscription
              </Paragraph>
            </Card.Content>
          </Card>
        </ScrollView>
        <Text style={[{ marginTop: 5 }, styles.header]}>Choose Your Plan</Text>
        <Item plan={plan} restaurant={restaurant} />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  optioncard: {
    height: 150,
    width: 200,
    margin: 5,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 2,
  },
  cardcontent: {
    fontSize: 16,
    color: '#888898',
    textAlign: 'justify'
  },
  header: {
    backgroundColor: '#fffeff',
    fontSize: 18,
    padding: 7,
    color: '#737373'
  },
  item: {
    paddingVertical: 15,
    height: 70,
    borderRadius: 5,
    elevation: 2,
    margin: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  selectoffer: {
    backgroundColor: '#81b854',
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
