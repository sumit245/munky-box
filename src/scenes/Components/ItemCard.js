import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { Avatar, } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Favourite } from '../Components/favourite/favourite'

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.item,
    }
  }
  componentDidMount() {
    if (this.props.name !== "home") {
      this.setState({ isHome: true })
    }
  }
  reviews = () => {
    Actions.push('reviews');
  };
  detailpage = () => {
    const title = this.state.restaurant_name
    Actions.push('details', { title: title, ...this.state })
  };
  render() {
    return (
      <Card containerStyle={styles.item} key={this.state._id} >
        <Image
          source={{ uri: this.state.documents[1].image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Favourite style={styles.bookmark} isHome={this.state.isHome} restaurant={this.state} />
        <View style={styles.footer}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.detailpage}>
            <Avatar.Image
              size={40}
              source={{ uri: this.state.documents[0].image }}
              style={{ marginLeft: 5 }}
            />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    styles.tags,
                    { fontSize: 18 },
                  ]}
                  numberOfLines={1}>
                  {this.props.item.restaurant_name}
                </Text>
                <Icon style={{ marginTop: 5 }} name="stop-circle" color={this.props.item.type === 'Veg' ? '#2aaf21' : '#cc2224'} size={16} />
              </View>
              <Text
                style={[
                  styles.tags,
                  { fontSize: 14, marginTop: -6, color: '#555', maxWidth: '90%' },
                ]}
                ellipsizeMode="tail"
                numberOfLines={2}>
                {this.props.item.about}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rating}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={this.reviews}>
              <Icon name="star" style={{ alignSelf: 'center' }} />
              <Text style={{ marginHorizontal: 2 }}>
                {this.props.item.rating || "5" + "/5"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', top: 2, marginLeft: 10 }}>
          <View
            style={styles.price}>
            <Text numberOfLines={1}>
              2 Days
            </Text>
            <Text numberOfLines={1}>
              {this.state.plan ? "$" + this.state.plan.twoPlan.customer_2price : " "}
            </Text>
          </View>
          <View
            style={styles.price}>
            <Text numberOfLines={1}>
              15 Days
            </Text>
            <Text numberOfLines={1}>
              {this.state.plan ? "$" + this.state.plan.fifteenPlan.customer_15price : ""}
            </Text>
          </View>
          <View
            style={styles.price}>
            <Text numberOfLines={1}>
              30 Days
            </Text>
            <Text numberOfLines={1}>
              {this.state.plan ? "$" + this.state.plan.thirtyPlan.customer_30price : ""}
            </Text>
          </View>

        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    shadowOffset: { width: 2, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 5,
    paddingVertical: 2,
    paddingHorizontal: 2,
    height: 250,
    marginHorizontal: 2,
  },
  image: {
    width: '98%',
    height: 150,
    marginTop: 1,
    marginLeft: 1,
    overflow: 'hidden',
    position: 'absolute',
  },
  title: {
    paddingHorizontal: 5,
    marginTop: 152,
    borderRadius: 2,
    fontSize: 22,
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  rating: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    right: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 2,
    fontSize: 18,
    marginBottom: 0,
  },
  tags: {
    borderRadius: 2,
    paddingHorizontal: 6,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  price: {
    borderRightWidth: 1,
    alignItems: 'flex-start',
    width: '33%',
    borderRightColor: '#e0e0e0',
    marginBottom: 2,
    fontSize: 12,
    paddingHorizontal: 5,
  },
  typelogo: {
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  footer: {
    marginTop: 154,
    flexDirection: 'row'
  }
});
