import React, { Component } from 'react';
import {ActivityIndicator,ToastAndroid,TouchableOpacity, Text, View, StyleSheet, Image, ScrollView, TextInput, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Dimensions.get('window').width-20;
export default class TopSlider extends Component {
  constructor(props) {
     super(props);
     this.state={
           data:[],
           entries:[
             {'title': 'https://break2ru.com/chetan/img2.jpg'},
             {'title': 'https://break2ru.com/chetan/img1.jpeg'}, 
             {'title': 'https://break2ru.com/chetan/img3.jpg'},
             {'title': 'https://www.wallpaperflare.com/static/377/523/822/pizza-olives-mushrooms-parsley-wallpaper.jpg'},
           ]
        }
  }
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Image source={{uri: item.title}} style={styles.slidei}></Image>
            </View>
        );
    }
  render() {
    return (
      <View style={styles.container}>
            <Carousel
              //layout={'stack'} layoutCardOffset={`18`}
              ref={(c) => {this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
        <Text> </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
      marginTop:10,
  },
  slidei: {
      justifyContent: 'center',
      height: 200,
      width: '100%',
      borderRadius:5
  },
  container: {
    flex:0,
  },

});
