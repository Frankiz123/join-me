import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { CardTitle, CardContent, CardAction, CardButton} from 'react-native-cards';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { getColors } from '../../colors';
import CustomText from './CustomText';
import { useTheme } from '@react-navigation/native';
const CardImage= (props) => {
  const { buttonTitle, onPress, disabled, btnBackground } = props;
  const { colors } = useTheme();
  const { textButton, container } = styles(colors);
return (
 
  <Card>
    <CardImage 
        source={require('../../assets/images/activity1.png')}
        style={{ height: 250, width: 320, borderTopLeftRadius:20,borderTopRightRadius:20, }}
        title="Top 10 South African beaches"
    />
    <CardTitle
      subtitle="Number 6"
    />
    <CardContent text="Clifton, Western Cape" />
    <CardAction 
      separator={true} 
      inColumn={false}>
      <CardButton
        onPress={() => {}}
        title="Share"
        color="#FEB557"
      />
      <CardButton
        onPress={() => {}}
        title="Explore"
        color="#FEB557"
      />
    </CardAction>
  </Card>
 );
};

const styles = (colors) =>
  StyleSheet.create({
    textButton: {
      color: colors.btnText,
      paddingVertical: hp(1.4),
      paddingHorizontal: wp(2),
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      paddingHorizontal: 5,
      paddingVertical: 5,
      minWidth: wp(25),
    },
  });

export default CardImage;
