import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BannerCarousel from './BannerCarousel';
import ItemCard from './ItemCard';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import axios from 'axios';
import { CUISINE_URL, RESTAURANT_URL } from '../../services/EndPoints';
import DeliveryOptions from './DeliveryOptions';
import SortAndFilter from './SortAndFilter';

const renderItem = ({ item, index }) => <ItemCard index={index} item={item} />;

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
      <ScrollView invertStickyHeaders>
        <BannerCarousel />
        <TouchableOpacity onPress={onPress}>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={{ marginLeft: 5 }}
          data={restaurant}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    )
  }

}
const Dinner = () => {
  return (
    <ScrollView invertStickyHeaders>
      <BannerCarousel />
      <TouchableOpacity onPress={onPress}>
      </TouchableOpacity>
      {/* <FlatList
        contentContainerStyle={{ marginLeft: 5 }}
        data={restaurant}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
    </ScrollView>
  )
}
const Cuisine = ({ image, title }) => (
  <View style={styles.cuisine}>
    <Image source={{ uri: image }} style={{ width: 40, height: 40, borderRadius: 20 }} />
    <Text style={styles.cuisine_name}>{title}</Text>
  </View>
);
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
    console.error(this.props);

  }

  renderCuisine = ({ item }) => (
    <Cuisine image={item.image} title={item.cuisineName} />
  );

  render() {
    const { cuisine } = this.state;
    {
      return (
        cuisine.length > 0 ? (
          <View style={{ flex: 1 }}>
            <View
              style={styles.header}
            >
              <DeliveryOptions />
              <SortAndFilter />

            </View>

            <View style={{
              height: 100,
            }}>
              <FlatList
                contentContainerStyle={{ marginLeft: 10 }}
                data={this.state.cuisine}
                renderItem={this.renderCuisine}
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


          </View>
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
    paddingTop: 2,
    marginBottom: 14,
    paddingHorizontal: 2,
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
