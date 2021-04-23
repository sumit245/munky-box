import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { getFavourite } from '../../services/getFavourite'


import ItemCard from './ItemCard'

const renderItem = ({ item, index }) => <ItemCard index={index} item={item} />;
export default class Favouite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: []
        }
    }
    componentDidMount() {
        getFavourite('@favourite').then(res => {
            this.setState({ restaurant: res })
        }).catch(err => {
            console.error(err)
        })
    }

    render() {
        const { restaurant } = this.state
        if (!restaurant) {
            return (
                <View style={styles.container} >
                    <Text style={{ textAlign: 'center', color: '#979797', fontSize: 14 }} >Please wait a while we are fetching your favourite restaurants...  </Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={{ marginLeft: 5 }}
                        data={restaurant}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            )
        }

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})