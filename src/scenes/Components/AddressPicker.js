import React, {Component} from 'react';
import {View, Text,StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding'


export default class AddressPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 28.635954654261838,
        longitude: 77.20468467101455,
        latitudeDelta: 0.010619764177146607,
        longitudeDelta: 0.012099780142321492,
      },
    };
  }

  componentdidMount() {

      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Position from GPS',position);
          this.setState({
            region: position,
          });
          return region;
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    

//     Geocoder.init("AIzaSyDpK09hWHIMPnKghhwlbLiEfTuYVwMJI58")
//     x=Geocoder.from({
//             position        
//     })
//     console.log(x)
   }

  onRegionChange(region) {
    console.log('Moving',region);
    
    (region) => {
      this.setState({region});
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        <Marker
          draggable
          coordinate={{
              latitude:this.state.region.latitude,
              longitude:this.state.region.longitude,
              longitudeDelta:this.state.region.longitudeDelta,
              latitudeDelta:this.state.region.latitudeDelta
            }}
          title={'Pick Your Current Location'}
          description={
            this.state.region.latitude.toString() +
            ', ' +
            this.state.region.longitude.toString()
          }
        />
        <Text>{this.state.region.latitude.toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
