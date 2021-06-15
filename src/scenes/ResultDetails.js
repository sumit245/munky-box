import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import MenuItem from './Components/MenuItem';
import { Actions } from 'react-native-router-flux';
import PlanChooser from './PlanChooser';
import Icon from 'react-native-vector-icons/Ionicons';

const renderItem = ({ item, index }) => <MenuItem index={index} meals={item} />;
const { width, height } = Dimensions.get('window')
export default class ResultDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props
    }
  }

  chooser = () => {
    Actions.planchooser({ title: this.props.title });
  }

  render() {
    const { meals, documents, plan, restaurant_name } = this.state
    return (
      <ScrollView style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header} >
          <Image
            source={{ uri: documents[1].image }}
            style={styles.headerImage}
          />
          <Image source={{ uri: documents[0].image }} style={styles.avatarImage} height={0.3 * width} width={0.3 * width} />
        </View>
        <Text
          style={styles.chefName}>
          {this.props.title}
        </Text>
        <Text style={styles.chefName}>
          <Icon name="star" color="#ea3" size={18} />
          <Icon name="star" color="#ea3" size={18} />
          <Icon name="star-half" color="#ea3" size={18} />
          <Icon name="star-outline" color="#ea3" size={18} />
          <Icon name="star-outline" color="#ea3" size={18} />

        </Text>

        <FlatList
          contentContainerStyle={{ marginLeft: 5 }}
          data={meals}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Text style={{ fontSize: 16, justifyContent: 'flex-start', color: '#585855' }}>
          {this.props.description}
        </Text>
        <PlanChooser plan={plan} restaurant={restaurant_name} />
        <View style={styles.about} >
          <Text style={{ fontSize: 16, textAlign: "justify", color: "#676" }} >
            {this.props.about}
          </Text>
        </View>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    overflow: 'scroll',
    height: height,
  },
  card: {
    height: 150,
  },
  header: {
    elevation: 1,
  },
  headerImage: {
    width: width,
    height: 0.5 * width,
    resizeMode: 'cover',
    margin: -10
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 4,
    borderColor: '#fcfcfc',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -0.14 * width
  },
  chefName: {
    color: '#424',
    fontSize: 24,
    textAlign: 'center',
    padding: 2,
    marginTop: -5
  },
  about: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 5,
  },
});
