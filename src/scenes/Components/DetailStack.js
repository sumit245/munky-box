import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Image, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ItemCard from './ItemCard';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import axios from 'axios';
import { CUISINE_URL, RESTAURANT_URL } from '../../services/EndPoints';
import DeliveryOptions from './home/DeliveryOptions';
import SortAndFilter from './home/SortAndFilter';

const renderItem = ({ item, index, }) => <ItemCard key={index} index={index} item={item} />;

const onPress = () => {
  Actions.details({ title: 'Sponsored' });
};

class Lunch extends Component {
  state = {
    restaurant: []
  }
  componentDidMount() {
    axios.get(RESTAURANT_URL).then((res) => {
      this.setState({ restaurant: res.data })
    }).catch((err) => {
      console.error(err);
    })
  }
  render() {
    const { restaurant } = this.state
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <BannerCarousel />   
        <TouchableOpacity onPress={onPress}>
        </TouchableOpacity> */}
        <FlatList
          contentContainerStyle={{ marginLeft: 5, paddingBottom: 4 }}
          data={restaurant}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  }

}
const Dinner = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <BannerCarousel /> */}
      <TouchableOpacity onPress={onPress}>
      </TouchableOpacity>
      {/* <FlatList
        contentContainerStyle={{ marginLeft: 5 }}
        data={restaurant}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
    </SafeAreaView>
  )
}

export default class DetailStack extends Component {
  state = {
    index: 0,
    routes: [{ key: '1', title: 'Lunch' }, { key: '2', title: 'Dinner' }],
    cuisine: []
  };
  _handleIndexChange = index => {
    this.setState({ index })
  };
  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#2266cf' }}
      style={{ backgroundColor: 'transparent', padding: 0, height: 34, marginTop: -18 }}
      activeColor='#2266ff'
      labelStyle={{ fontWeight: 'bold' }}
      inactiveColor='#272727'
    />
  );

  _renderScene = SceneMap({
    '1': Lunch,
    '2': Dinner,
  });
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get(CUISINE_URL).then((res) => {
      this.setState({ cuisine: res.data })
    }).catch((err) => {
      console.error(err);
    })
  }
  selectCuisine = (cuisine) => {
    axios.get(RESTAURANT_URL).then((res) => {
      let restaurants = res.data
      let filteredRestaurant = []
      for (let i = 0; i < restaurants.length; i++) {
        if (restaurants[i].cuisine_type === cuisine) {
          filteredRestaurant.push(restaurants[i])
        }
      }
      this.setState({ restaurant: filteredRestaurant })
    }).catch((err) => {
      console.error(err);
    })
  }

  renderCuisine = ({ item }) => (
    <Cuisine image={item.image} title={item.cuisineName} />
  );

  render() {
    const { cuisine } = this.state;
    {
      return (
        cuisine.length > 0 ? (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header} >
              <DeliveryOptions />
              <SortAndFilter />
            </View>

            <View style={{ height: 100 }}>
              <FlatList
                contentContainerStyle={{ marginLeft: 10 }}
                data={[...this.state.cuisine, { last: true }]}
                renderItem={({ item }) => {
                  if (item.last) {
                    return (
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFF", justifyContent: "center", alignItems: "center", left: -20 }}>
                        <Text style={{ color: "#777" }} >All</Text>
                      </View>
                    );
                  }
                  return (
                    <TouchableOpacity onPress={() => this.selectCuisine(item.cuisineName)}>
                      <Cuisine image={item.image} title={item.cuisineName} />
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <TabView
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this._handleIndexChange}
              style={{ marginTop: -20 }}
            />
          </SafeAreaView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <ActivityIndicator size="large" color="#0707" animating />
            <Text style={{ fontSize: 22, color: "#0707" }} >Fetching Best Restaurant For You....</Text>
          </View>
        )
      );
    }
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfcfcf'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 32,
  },
  containerStyle: { backgroundColor: 'white', padding: 20 },
  cuisine: {
    justifyContent: 'flex-start',
    width: 80,
    marginBottom: 10
  },

  cuisine_name: {
    fontSize: 14,
    textAlign: 'left',
    color: '#000',
  }
});
