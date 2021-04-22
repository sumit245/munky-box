import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
export default class MenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card containerStyle={styles.item} key={this.props.index}>
        <View>
          <Image
            source={{ uri: this.props.item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 150 }}>
          <View style={{ flexDirection: 'row' }} >
            <Icon style={{ marginTop: 5 }} name="stop-circle" color={this.props.item.cuisine_type === 'veg' ? '#2aaf21' : '#cc2224'} size={16} />
            <Text style={styles.title}>
              {this.props.item.meal_name}
            </Text>
          </View>
          <Text style={styles.title}>
            {this.props.item.day}
          </Text>
        </View>
        <Text style={[styles.title, { fontSize: 12, color: '#444', paddingHorizontal: 18 }]}>{this.props.item.description}</Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 2,
    height: 200,
    bottom: 2,
    width: 250,
    margin: 2,
  },
  image: {
    width: 240,
    height: 150,
    marginTop: 1,
    marginLeft: 2,
    position: 'absolute',
  },
  title: {
    paddingHorizontal: 2,
    fontSize: 16,
    color: '#779777'
  },
  typelogo: {
    paddingHorizontal: 5,
    marginLeft: 5
  }
});
