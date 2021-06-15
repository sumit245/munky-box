import React, { Component } from 'react'
import { Alert } from 'react-native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Fontisto'
import { removeCard, getAllKeys, getMultipleCards } from '../../../services/cardHandler'

export default class CheckoutCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: {}
        }
    }

    cards = () => {
        getAllKeys().then(res => {
            let allcards = []
            let pattern = /\bcard/;
            res.map(data => {
                pattern.test(data) ? allcards.push(data) : null
            })
            getMultipleCards(allcards).then(res => {
                let thisCard = []
                res.map((data, key) => {
                    data.map((card, key) => {
                        thisCard.push(card)
                    })
                    let caards = JSON.parse(thisCard[1])
                    this.setState({ cards: caards.values })
                })
            })
                .catch(err => {
                    console.error(err);
                })
                .catch(err => {
                    console.error(err);
                })
        })
    }
    _nextAction = () => {
        Actions.push('cards', { title: "Select Card", checkout: true })
    }
    componentDidMount() {
        this.cards()
    }
    handleSelector = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
        if (this.state.selected === false) {
            this.props.cardHandler(this.state.cards)
        }
    }
    deleteHandler = () => {
        Alert.alert(
            "Delete",
            "Are you Sure",
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "OK", onPress: () => {
                    removeCard('@card')
                }
            }
            ]
        )
    }
    shouldComponentUpdate(prevProps, nexProps) {
        return true
    }
    componentDidUpdate(prevProps) {
        if (prevProps.cards !== this.props.cards) {
            this.setState({
                cards: this.props.cards
            })
        }
    }
    render() {
        const { optionrow, options } = this.props
        const { cards, selected } = this.state
        return (
            <>
                {
                    Object.values(cards).length === 0 ? (
                        <TouchableOpacity style={optionrow} onPress={this._nextAction} >
                            <Text style={options} >Add a card</Text>
                            <Icon name="angle-right" color="#ccc" size={16} />
                        </TouchableOpacity>

                    ) : (
                        <View style={optionrow}>
                            <View>
                                <View style={styles.rightContainer}>
                                    <Text style={[options, { width: 100 }]} ellipsizeMode="head" numberOfLines={1}   >{cards.number}</Text>
                                    <Icon name={cards.type}
                                        color="#27d" size={18} />
                                    <Text onPress={() => Actions.push('changeaddress', { type: 'edit' })} style={styles.hyperlink}>Edit</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ paddingHorizontal: 1, color: '#797' }} >{cards.name}</Text>
                                </View>

                            </View>
                            <View style={styles.rightContainer} >
                                <TouchableOpacity style={styles.buttons} onPress={this.deleteHandler} >
                                    <Icon name="trash" color="red" size={18} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons} onPress={this.handleSelector} >
                                    <Icon name={selected ? "radio-btn-active" : "radio-btn-passive"} color={selected ? "#22cc73" : "#53aa84"} size={18} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    )
                }

            </>
        )
    }
}
const styles = StyleSheet.create({
    rightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1
    },
    buttons: {
        height: 24,
        width: 24,
        padding: 1,
        margin: 2,
        justifyContent: 'center'
    },
    hyperlink: {
        color: "#245399",
        textAlign: "right",
        textDecorationStyle: "solid"
    }
})

