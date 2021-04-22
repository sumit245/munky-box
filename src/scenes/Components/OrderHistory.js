import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {Card} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Taz Hotel',
    time: '26/11/2020-30/11/2020',
    numofmeals: '10',
    type: 'veg',
    imageURL:
      'http://s3.amazonaws.com/gmi-digital-library/65caecf7-a8f7-4a09-8513-2659cf92871e.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Kake di Hatti',
    time: '2/03/2020-30/08/2020',
    numofmeals: '10',
    type: 'veg',
    imageURL:
      'http://upload.wikimedia.org/wikipedia/commons/f/f9/Yorkshire_Pudding.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Punjabi Duniya',
    time: '2/03/2020-30/08/2020',
    numofmeals: '10',
    type: 'veg',
    imageURL:
      'http://elanaspantry.com/wp-content/uploads/2008/10/acorn_squash_with_cranberry.jpg',
  },
];

const Item = ({title, time}) => (
  <Card>
    <View style={{flexDirection: 'row'}}>
      <View>
        <Text style={{color:'#777',fontWeight:'bold',fontSize:16}}>{title}</Text>
        <Text>{time}</Text>
      </View>

      <TouchableOpacity style={styles.reorder}>
        <Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>REORDER</Text>
      </TouchableOpacity>
    </View>
  </Card>
);
const renderItem = ({item}) => <Item title={item.title} time={item.time} />;

export default class OrderHistory extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  reorder:{
      borderColor:'red',
      borderRadius:20,
      width:120,
      height:40,
      borderWidth:2,
      textAlign:'center',
      justifyContent:'center',
      alignSelf:'flex-end',
      padding:5,
      right:-20
  }
});
