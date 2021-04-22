import React, { Component } from 'react'
import {View,Text,StyleSheet,Image,Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'

const switchtoauth=()=>{
    Actions.replace('auth')
}
class LoadingScene extends Component {
    state={
        logoAnime:new Animated.Value(0),
        logoText: new Animated.Value(0),
        loadingSpiner: false,
    }
    componentDidMount(){
        const {logoAnime,logoText }=this.state;
        Animated.parallel([
            Animated.spring(logoAnime,{
                toValue:1,
                tension:10,
                friction:2,
                duration:1000
            }).start(),
            Animated.timing(logoText,{
                toValue:1,
                duration:1200,
            }),
        ]).start(()=>{
            this.setState({
                    loadingSpiner:true,
                });
            setTimeout(switchtoauth,1000);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                style={{
                    opacity:this.state.logoAnime,
                    top:this.state.logoAnime.interpolate({
                        inputRange:[0,1],
                        outputRange:[100,0],
                    }),
                }}>
                </Animated.View>
                <Animated.View style={{opacity:this.state.logoText}}>
                <Text style={styles.logotext}>MunkyBox</Text>
                </Animated.View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fc22c4",
        alignItems:"center",
        justifyContent:"center"
        
    },
    logotext:{
        fontSize:50,
        color:'#fff',
    }
})

export default LoadingScene;