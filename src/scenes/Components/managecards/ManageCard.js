import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import { CreditCardInput } from "react-native-credit-card-input";
import Icon from 'react-native-vector-icons/Fontisto'
import { getMultipleCards, setMultipleCards, getAllKeys, removeCard } from '../../../services/cardHandler';

const { width, height } = Dimensions.get('window')
export default class ManageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            numCards: 0,
            message: "",
            selected: false
        }
    }
    _onChange = (formData) => {
        let card = JSON.stringify(formData, null, "")
        this.setState({ card: card })
    }
    _onFocus = (field) => console.log("focusing", field);
    handleSelector = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    }
    cardAdd = () => {
        const { card, numCards } = this.state
        console.log(card.valid);
        if (JSON.parse(card).valid === true) {
            let currCard = '@card' + numCards
            const cardDetail = [currCard, card]
            setMultipleCards(cardDetail)
        }
        else {
            ToastAndroid.show('Check your details and try again :(', 1000)
        }
    }
    componentDidMount() {
        getAllKeys().then(res => {
            let allcards = []
            let pattern = /\bcard/;
            res.map(data => {
                pattern.test(data) ? allcards.push(data) : null
            })
            getMultipleCards(allcards).then(res => {
                let numofCards = Object.values(res).length
                // let credits = []
                // let newkeys = []
                // let credit_card = Object.values(res)
                // credit_card.map((data, key) => {
                //     let newCard = JSON.parse(data[1]).values
                //     let newKey = data[0]
                //     newkeys.push(newKey)
                //     credits.push(newCard)
                // })
                this.setState({ cards: res, numCards: numofCards })
            })
                .catch(err => {
                    console.error(err);
                })
                .catch(err => {
                    console.error(err);
                })
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    componentDidUpdate(prevProps) {
        if (prevProps.cards !== this.props.cards) {
            this.setState({ cards: this.props.cards })
        }
    }
    render() {
        const { cards, message, selected } = this.state
        return (
            <ScrollView contentContainerStyle={styles.container} >
                <ScrollView style={styles.body}
                    onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                    onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                    onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
                >
                    {
                        cards.length > 0 ? (cards.map((data, key) => {
                            let newCard = JSON.parse(data[1]).values
                            return (
                                <View style={styles.optionrow} key={key}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.buttons} onPress={this.handleSelector} >
                                            <Icon name={selected ? "radio-btn-active" : "radio-btn-passive"} color={selected ? "#22cc73" : "#53aa84"} size={18} />
                                        </TouchableOpacity>
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                <Text>{newCard.number}</Text>
                                                <Icon name={newCard.type} size={18} style={{ marginHorizontal: 2 }} color="#3366aa" />
                                            </View>
                                            <Text>{newCard.name}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        removeCard('@card0')
                                    }} >
                                        <Icon name="trash" size={20} color="#cc6666" />
                                    </TouchableOpacity>
                                </View>
                            )
                        })) : (
                            <Text>{message}</Text>
                        )
                    }
                </ScrollView>
                <Text style={{ paddingHorizontal: 14, marginTop: -20, color: "#444", fontSize: 16 }} >Add a card</Text>
                <CreditCardInput
                    requiresName
                    requiresCVC
                    cardScale={1.0}
                    labelStyle={styles.label}
                    inputStyle={styles.input}
                    validColor={"#228822"}
                    invalidColor={"#aa2222"}
                    placeholderColor={"darkgray"}
                    onFocus={this._onFocus}
                    onChange={this._onChange} />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.checkout} onPress={this.cardAdd}>
                        <Icon name="credit-card" size={28} color="#FFF" />
                        <Text style={styles.btnText}>Add card</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexGrow: 1,
        height: 2 * height / 3
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    body: {
        padding: 10,
        maxHeight: height / 3
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 1
    },
    checkout: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#df7070',
        padding: 6,
        width: width - 4,
        marginHorizontal: 2,
        borderRadius: 5
    },
    btnText: {
        fontSize: 16,
        color: '#fff'
    },
    optionrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        shadowOffset: {
            height: 1,
            width: 1
        },
        shadowOpacity: 0.5,
        shadowColor: '#999',
        shadowRadius: 5,
        marginVertical: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
    }
})
